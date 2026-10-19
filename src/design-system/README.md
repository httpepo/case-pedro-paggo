# Design system local

Esta pasta é a camada visual incorporada à aplicação. Ela não é um pacote
externo nem um workspace separado.

## Organização

- `tokens.json`: fonte de verdade dos papéis de cor, tipografia, espaçamento e raio.
- `scripts/build-tokens.mjs`: regenera `index.css`, `generated/tokens.tsx` e o favicon.
- `index.css`: tema Tailwind 4 consumido uma vez por `src/app/globals.css`.
- `components/ui/`: primitivas reutilizáveis, sem lógica de domínio.
- `assets/brand/`: logos locais da Paggo usados pela aplicação.
- `references/`: fontes incorporadas e evidências usadas pelo gerador.

As páginas ficam em `src/app`, composições específicas em `src/components` e
as regras de negócio em `src/modules`. Banco, configuração e integrações ficam
em `src/infrastructure`. Componentes do design system não devem acessar dados,
rotas ou integrações.

Para alterar tokens:

```sh
pnpm design:tokens
```

Depois, valide com `pnpm typecheck` e `pnpm build`.

## Favicon da aplicação

`assets/brand/favicon-paggo.svg` é o arquivo fornecido pelo usuário, preservado
sem alterações. Os metadados em `src/app/layout.tsx` importam esse asset local
como ícone SVG de qualquer tamanho, com URL versionada pelo build.

O próprio SVG usa `prefers-color-scheme`: símbolo escuro nas abas claras e
branco nas escuras. Esse comportamento acompanha o navegador, independentemente
do tema escuro padrão da aplicação. A geração de tokens não sobrescreve esse
arquivo de marca; o favicon genérico gerado em `assets/favicon.svg` não é usado
nos metadados do app.

## Footer institucional

`src/components/site-footer.tsx` compõe o rodapé inspirado no
[site público da Paggo](https://www.paggo.com.br/), consultado em 19/10/2026.
Reutiliza `Button` na variante `brand`, o SVG branco local, tipografia e
espaçamentos do tema. A composição não cria páginas institucionais dentro do
case: seus links apontam para os destinos oficiais, enquanto o CTA principal
leva ao formulário `/#cadastro`.

O papel `footerGlow` (`--footer-glow`, utilitário `bg-footer-glow`) registra o
dourado decorativo da referência na fonte de verdade. O efeito usa gradientes
CSS estáticos, sem canvas, dependências, fontes remotas ou animações. Texto,
links e bordas continuam usando `foreground`, `muted-foreground` e `border`,
com contraste mais legível que as opacidades do site de referência.

Os dados institucionais são identificados como referência da Paggo; o case não
assume essa identidade. Não há botão fictício de preferências de cookies nem
gestor de consentimento de terceiros incorporado ao projeto.
