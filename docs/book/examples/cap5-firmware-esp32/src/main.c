#include <stdio.h>
#include <string.h>

#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/task.h"

#include "driver/gpio.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "esp_wifi.h"
#include "nvs_flash.h"

#include "mbedtls/ctr_drbg.h"
#include "mbedtls/ecp.h"
#include "mbedtls/entropy.h"
#include "mbedtls/pk.h"
#include "mbedtls/sha256.h"

#include "lab_config.h"
#include "driver/rc522_spi.h"
#include "rc522.h"
#include "rc522_picc.h"

#define WIFI_CONNECTED_BIT BIT0

static const char *TAG = "cap5-lab";
static EventGroupHandle_t wifi_event_group;
static rc522_driver_handle_t rc522_driver;
static rc522_handle_t rc522_scanner;

static void bytes_to_hex(const unsigned char *input, size_t len, char *output, size_t out_len)
{
    static const char hex[] = "0123456789abcdef";
    size_t i;

    if (out_len < (len * 2) + 1) {
        return;
    }

    for (i = 0; i < len; ++i) {
        output[(i * 2)] = hex[(input[i] >> 4) & 0x0F];
        output[(i * 2) + 1] = hex[input[i] & 0x0F];
    }

    output[len * 2] = '\0';
}

static void wifi_event_handler(void *arg, esp_event_base_t event_base, int32_t event_id, void *event_data)
{
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
        esp_wifi_connect();
    } else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
        ESP_LOGW(TAG, "Wi-Fi desconectado. Tentando reconectar...");
        esp_wifi_connect();
    } else if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        xEventGroupSetBits(wifi_event_group, WIFI_CONNECTED_BIT);
    }
}

static void wifi_init_sta(void)
{
    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    wifi_config_t wifi_config = {
        .sta = {
            .ssid = WIFI_SSID,
            .password = WIFI_PASS,
            .threshold.authmode = WIFI_AUTH_WPA2_PSK,
            .failure_retry_cnt = 5
        }
    };

    wifi_event_group = xEventGroupCreate();

    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_create_default_wifi_sta();

    ESP_ERROR_CHECK(esp_wifi_init(&cfg));
    ESP_ERROR_CHECK(esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID, &wifi_event_handler, NULL));
    ESP_ERROR_CHECK(esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP, &wifi_event_handler, NULL));

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));
    ESP_ERROR_CHECK(esp_wifi_start());

    xEventGroupWaitBits(wifi_event_group, WIFI_CONNECTED_BIT, pdFALSE, pdTRUE, pdMS_TO_TICKS(10000));
}

static void on_picc_state_changed(void *arg, esp_event_base_t base, int32_t event_id, void *data)
{
    rc522_picc_state_changed_event_t *event = (rc522_picc_state_changed_event_t *)data;
    rc522_picc_t *picc = event->picc;

    if (picc->state == RC522_PICC_STATE_ACTIVE) {
        ESP_LOGI(TAG, "Tag detectada pela biblioteca RC522.");
        rc522_picc_print(picc);
    } else if (picc->state == RC522_PICC_STATE_IDLE && event->old_state >= RC522_PICC_STATE_ACTIVE) {
        ESP_LOGI(TAG, "Tag removida do campo.");
    }
}

static void rc522_init_with_component(void)
{
    static spi_bus_config_t bus_config = {
        .miso_io_num = RC522_PIN_MISO,
        .mosi_io_num = RC522_PIN_MOSI,
        .sclk_io_num = RC522_PIN_SCLK,
        .max_transfer_sz = 32
    };

    static rc522_spi_config_t driver_config = {
        .host_id = SPI3_HOST,
        .bus_config = &bus_config,
        .dev_config = {
            .clock_speed_hz = RC522_SPI_CLOCK_HZ,
            .spics_io_num = RC522_PIN_CS,
        },
        .rst_io_num = RC522_PIN_RST,
    };

    rc522_config_t scanner_config = {
        .driver = NULL,
        .poll_interval_ms = RC522_POLL_INTERVAL_MS
    };

    ESP_ERROR_CHECK(rc522_spi_create(&driver_config, &rc522_driver));
    ESP_ERROR_CHECK(rc522_driver_install(rc522_driver));

    scanner_config.driver = rc522_driver;
    ESP_ERROR_CHECK(rc522_create(&scanner_config, &rc522_scanner));
    ESP_ERROR_CHECK(rc522_register_events(
        rc522_scanner,
        RC522_EVENT_PICC_STATE_CHANGED,
        on_picc_state_changed,
        NULL
    ));
    ESP_ERROR_CHECK(rc522_start(rc522_scanner));

    if (RC522_PIN_RST >= 0) {
        ESP_LOGI(TAG, "RC522 iniciado com pino RST dedicado.");
    } else {
        ESP_LOGI(TAG, "RC522 iniciado em modo de soft-reset.");
    }
}

static esp_err_t build_did_document(char *json_out, size_t json_len)
{
    int ret;
    unsigned char x[32];
    unsigned char y[32];
    unsigned char pubkey_uncompressed[65];
    unsigned char digest[32];
    char did_suffix[33];
    char pubkey_hex[131];
    char did_id[64];

    mbedtls_entropy_context entropy;
    mbedtls_ctr_drbg_context ctr_drbg;
    mbedtls_pk_context pk;

    mbedtls_entropy_init(&entropy);
    mbedtls_ctr_drbg_init(&ctr_drbg);
    mbedtls_pk_init(&pk);

    ret = mbedtls_ctr_drbg_seed(
        &ctr_drbg,
        mbedtls_entropy_func,
        &entropy,
        (const unsigned char *)"didguard-cap5",
        strlen("didguard-cap5")
    );
    if (ret != 0) {
        goto cleanup;
    }

    ret = mbedtls_pk_setup(&pk, mbedtls_pk_info_from_type(MBEDTLS_PK_ECKEY));
    if (ret != 0) {
        goto cleanup;
    }

    ret = mbedtls_ecp_gen_key(
        MBEDTLS_ECP_DP_SECP256R1,
        mbedtls_pk_ec(pk),
        mbedtls_ctr_drbg_random,
        &ctr_drbg
    );
    if (ret != 0) {
        goto cleanup;
    }

    ret = mbedtls_mpi_write_binary(
        &mbedtls_pk_ec(pk)->MBEDTLS_PRIVATE(Q).MBEDTLS_PRIVATE(X),
        x,
        sizeof(x)
    );
    if (ret != 0) {
        goto cleanup;
    }

    ret = mbedtls_mpi_write_binary(
        &mbedtls_pk_ec(pk)->MBEDTLS_PRIVATE(Q).MBEDTLS_PRIVATE(Y),
        y,
        sizeof(y)
    );
    if (ret != 0) {
        goto cleanup;
    }

    pubkey_uncompressed[0] = 0x04;
    memcpy(&pubkey_uncompressed[1], x, sizeof(x));
    memcpy(&pubkey_uncompressed[33], y, sizeof(y));

    mbedtls_sha256(pubkey_uncompressed, sizeof(pubkey_uncompressed), digest, 0);
    bytes_to_hex(digest, 16, did_suffix, sizeof(did_suffix));
    bytes_to_hex(pubkey_uncompressed, sizeof(pubkey_uncompressed), pubkey_hex, sizeof(pubkey_hex));

    snprintf(did_id, sizeof(did_id), "did:esp32:%s", did_suffix);

    snprintf(
        json_out,
        json_len,
        "{\n"
        "  \"@context\": [\"https://www.w3.org/ns/did/v1\"],\n"
        "  \"id\": \"%s\",\n"
        "  \"verificationMethod\": [{\n"
        "    \"id\": \"%s#device-key-1\",\n"
        "    \"type\": \"EcdsaSecp256r1VerificationKey2019\",\n"
        "    \"controller\": \"%s\",\n"
        "    \"publicKeyHex\": \"%s\"\n"
        "  }],\n"
        "  \"authentication\": [\"%s#device-key-1\"]\n"
        "}\n",
        did_id,
        did_id,
        did_id,
        pubkey_hex,
        did_id
    );

    ESP_LOGI(TAG, "DID gerado: %s", did_id);
    ret = 0;

cleanup:
    mbedtls_pk_free(&pk);
    mbedtls_ctr_drbg_free(&ctr_drbg);
    mbedtls_entropy_free(&entropy);

    return ret == 0 ? ESP_OK : ESP_FAIL;
}

void app_main(void)
{
    char did_document[DID_BUFFER_SIZE];

    ESP_ERROR_CHECK(nvs_flash_init());
    wifi_init_sta();
    ESP_LOGI(TAG, "Wi-Fi inicializado.");

    rc522_init_with_component();
    ESP_LOGI(TAG, "RC522 inicializado via componente gerenciado.");

    if (build_did_document(did_document, sizeof(did_document)) == ESP_OK) {
        ESP_LOGI(TAG, "DID Document:\n%s", did_document);
    } else {
        ESP_LOGE(TAG, "Falha ao gerar DID Document.");
    }

    while (1) {
        vTaskDelay(pdMS_TO_TICKS(5000));
    }
}
