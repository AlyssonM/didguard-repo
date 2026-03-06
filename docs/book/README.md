# Estudos Fundamentais do DIDGuard em LaTeX

## Estrutura
- `main.tex`: arquivo principal da apostila no formato `book`
- `chapters/lista-de-siglas.tex`: lista geral de siglas no inicio do livro
- `chapters/ch01-dids.tex`: Capitulo 1 sobre DIDs
- `chapters/ch02-rfid-mifare.tex`: Capitulo 2 sobre RFID e MIFARE Classic
- `chapters/ch03-criptografia-aplicada.tex`: Capitulo 3 sobre fundamentos de criptografia aplicada
- `chapters/ch04-blockchain-contratos.tex`: Capitulo 4 sobre blockchain e contratos inteligentes
- `chapters/glossario.tex`: glossario geral no fim do livro
- `examples/`: mini projetos autocontidos usados nas secoes "Rodando na pratica"
- `references.bib`: base bibliografica BibTeX

## Requisitos para compilar
- TeX Live ou MiKTeX com `pdflatex` e `bibtex`
- Pacotes: `babel`, `natbib`, `csquotes`, `lmodern`, `geometry`, `setspace`, `verbatim`, `enumitem`

## Compilacao manual
No diretorio `docs/book`:

```bash
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

## Compilacao com `latexmk`

```bash
latexmk -pdf main.tex
```

## Expansao sugerida
- `chapters/ch05-ipfs-armazenamento.tex`
- `chapters/ch06-firmware-esp32.tex`
- `chapters/ch07-relayer-frontend.tex`
