import type { Result } from 'axe-core'

declare global {
  namespace Cypress {
    interface Chainable {
      /** Seleciona elementos pelo atributo data-cy. */
      getByCy(value: string): Chainable<JQuery<HTMLElement>>
      /** Roda o axe-core com as regras WCAG 2.1 A/AA e lista as violações no terminal. */
      checkAccessibility(): Chainable<void>
      /**
       * Emula prefers-color-scheme via Chrome DevTools Protocol (apenas navegadores Chromium).
       * Sem argumento, volta a seguir o tema do sistema operacional.
       */
      emulateColorScheme(scheme?: 'light' | 'dark'): Chainable<void>
    }
  }
}

Cypress.Commands.add('getByCy', (value: string) => cy.get(`[data-cy="${value}"]`))

function logViolations(violations: Result[]) {
  cy.task('log', `${violations.length} violação(ões) de acessibilidade encontrada(s)`)
  cy.task(
    'table',
    violations.map(({ id, impact, description, nodes }) => ({
      regra: id,
      impacto: impact,
      descricao: description,
      elementos: nodes.length,
    })),
  )
}

Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe()
  cy.checkA11y(
    undefined,
    { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } },
    logViolations,
  )
})

Cypress.Commands.add('emulateColorScheme', (scheme?: 'light' | 'dark') => {
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: { features: scheme ? [{ name: 'prefers-color-scheme', value: scheme }] : [] },
    }),
    { log: false },
  )
})

export {}
