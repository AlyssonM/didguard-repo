// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AccessRegistry
 * @notice Contrato simplificado de controle de acesso para o lab do Capítulo 4.
 *
 * Este contrato armazena permissões de acesso indexadas por um identificador
 * de credencial (hash de 32 bytes). No DIDGuard, esse identificador seria
 * o keccak256 de um DID como "did:example:alice".
 *
 * Conceitos demonstrados:
 *   - Struct para agrupar dados relacionados
 *   - Mapping (tabela hash on-chain) para acesso O(1) por chave
 *   - Eventos como log de auditoria imutável
 *   - Separação entre funções de escrita (transação) e leitura (view)
 */
contract AccessRegistry {

    /// @notice Estrutura que armazena o estado de acesso de uma credencial.
    /// @param allowed Indica se o acesso está concedido (true) ou revogado (false).
    /// @param expiresAt Timestamp Unix após o qual o acesso expira (0 = sem expiração).
    struct AccessRecord {
        bool allowed;
        uint64 expiresAt;
    }

    /// @notice Tabela de permissões: credentialId → AccessRecord.
    /// O mapping é private para que o acesso passe obrigatoriamente pela
    /// função getAccess(), permitindo futura lógica de validação.
    mapping(bytes32 => AccessRecord) private records;

    /// @notice Emitido sempre que uma permissão é criada ou modificada.
    /// Eventos ficam nos logs da blockchain e são indexáveis off-chain,
    /// funcionando como um log de auditoria imutável.
    event AccessUpdated(
        bytes32 indexed credentialId,
        bool allowed,
        uint64 expiresAt
    );

    /// @notice Cria ou atualiza a permissão de acesso de uma credencial.
    /// @dev Esta é uma função de ESCRITA — gera uma transação que consome gas.
    /// @param credentialId Hash da credencial (ex.: keccak256("did:example:alice"))
    /// @param allowed Se o acesso deve ser concedido ou revogado
    /// @param expiresAt Timestamp Unix de expiração (0 para nunca expirar)
    function setAccess(
        bytes32 credentialId,
        bool allowed,
        uint64 expiresAt
    ) external {
        records[credentialId] = AccessRecord({
            allowed: allowed,
            expiresAt: expiresAt
        });
        emit AccessUpdated(credentialId, allowed, expiresAt);
    }

    /// @notice Consulta a permissão de acesso de uma credencial.
    /// @dev Esta é uma função de LEITURA (view) — não gera transação nem consome gas.
    /// @param credentialId Hash da credencial a consultar
    /// @return allowed Se o acesso está concedido
    /// @return expiresAt Timestamp de expiração
    function getAccess(
        bytes32 credentialId
    ) external view returns (bool allowed, uint64 expiresAt) {
        AccessRecord memory record = records[credentialId];
        return (record.allowed, record.expiresAt);
    }
}
