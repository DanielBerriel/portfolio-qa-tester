# Portfólio · Daniel Araújo Berriel — Analista de QA

Portfólio pessoal construído como um projeto de QA: o próprio site é coberto por testes unitários, testes E2E, testes de acessibilidade e um pipeline de CI que só publica uma nova versão se todas as suítes passarem.

## Stack

| Camada | Ferramentas |
| --- | --- |
| Aplicação | React 19, TypeScript, Vite |
| Testes unitários e de componentes | Vitest, Testing Library, cobertura com V8 |
| Testes E2E | Cypress |
| Acessibilidade | cypress-axe (axe-core), regras WCAG 2.1 A/AA, temas claro e escuro |
| CI/CD | GitHub Actions + GitHub Pages |

## Como rodar

```bash
npm install
npm run dev            # servidor de desenvolvimento em http://localhost:5173
```

| Comando | O que faz |
| --- | --- |
| `npm run typecheck` | Checagem de tipos (app, configs e specs do Cypress) |
| `npm test` | Testes unitários e de componentes |
| `npm run test:coverage` | Testes unitários com relatório de cobertura em `coverage/` |
| `npm run build` | Build de produção em `dist/` |
| `npm run test:e2e` | Sobe o build em `localhost:4173` e roda toda a suíte do Cypress |
| `npm run cy:open` | Abre o Cypress interativo (rode `npm run build && npm run preview` antes) |

## Estratégia de testes

**Unitários e de componentes** (`src/**/*.test.ts(x)`)
- Integridade dos dados do currículo: e-mail válido, links apenas HTTPS, sem itens duplicados, uma única certificação em destaque.
- Cada seção renderiza exatamente o que está em `profile.ts`.
- Comportamento do menu mobile: abrir, fechar pelo botão, pela tecla Esc e ao escolher uma seção.
- Renderização condicional: botão de currículo, links de repositório e contatos opcionais.
- Estrutura acessível: um único `h1`, um `h2` por seção e link para pular ao conteúdo.

**E2E** (`cypress/e2e/`)
- `navegacao.cy.ts` — cada item do menu rola até a seção certa, cabeçalho fixo, navegação por teclado.
- `conteudo.cy.ts` — o conteúdo exibido bate com os dados do currículo; links externos seguros.
- `responsividade.cy.ts` — menu mobile e ausência de rolagem horizontal em 4 tamanhos de tela.
- `acessibilidade.cy.ts` — axe-core em desktop e mobile, nos temas claro e escuro.

Os specs do Cypress importam `src/data/profile.ts`, então os testes acompanham o conteúdo automaticamente quando o currículo muda.

## Como atualizar o conteúdo

Todo o conteúdo fica em [`src/data/profile.ts`](src/data/profile.ts). Para incluir LinkedIn, GitHub, WhatsApp ou o link de um repositório em um projeto, preencha o campo correspondente: o link aparece no site automaticamente.

**Currículo em PDF:** coloque o arquivo em `src/assets/curriculo/` e o botão "Baixar currículo" passa a aparecer no topo do site.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub e envie o código para a branch `main`.
2. Em **Settings → Pages → Build and deployment**, escolha **Source: GitHub Actions**.
3. A cada push na `main`, o workflow [`ci.yml`](.github/workflows/ci.yml) roda typecheck, testes unitários e E2E e, se tudo passar, publica o site em `https://<seu-usuario>.github.io/<nome-do-repositorio>/`.

> Se o repositório se chamar `<seu-usuario>.github.io`, o site fica na raiz do domínio: nesse caso, troque `BASE_PATH` no workflow para `/`.

## Observação para quem roda pelo terminal do VS Code

Se o Cypress falhar com `bad option: --smoke-test`, a variável `ELECTRON_RUN_AS_NODE` está definida no terminal. Rode `unset ELECTRON_RUN_AS_NODE` (bash) ou `Remove-Item Env:ELECTRON_RUN_AS_NODE` (PowerShell) e tente de novo.
