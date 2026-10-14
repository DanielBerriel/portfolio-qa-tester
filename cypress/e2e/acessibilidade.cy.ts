// O tema é emulado explicitamente: sem isso, o navegador herda o tema do sistema operacional
// e um dos dois temas nunca seria verificado (o teste passaria sem testar nada).
const themes = [
  { scheme: 'light', label: 'tema claro' },
  { scheme: 'dark', label: 'tema escuro' },
] as const

// As linhas do terminal entram com animação de opacidade; o axe só deve avaliar o contraste depois dela.
const waitForHeroAnimation = () => cy.get('.terminal-summary').should('have.css', 'opacity', '1')

describe('Acessibilidade (WCAG 2.1 A/AA)', { browser: '!firefox' }, () => {
  after(() => {
    cy.emulateColorScheme()
  })

  themes.forEach(({ scheme, label }) => {
    describe(label, () => {
      beforeEach(() => {
        cy.emulateColorScheme(scheme)
      })

      const visitInTheme = () => {
        cy.visit('/')
        cy.window().then((win) => {
          expect(win.matchMedia(`(prefers-color-scheme: ${scheme})`).matches, `${label} ativo`).to.be.true
        })
        waitForHeroAnimation()
      }

      it('não tem violações no desktop', () => {
        visitInTheme()

        cy.checkAccessibility()
      })

      it('não tem violações no mobile com o menu aberto', () => {
        cy.viewport('iphone-x')
        visitInTheme()
        cy.getByCy('menu-toggle').click()

        cy.checkAccessibility()
      })
    })
  })
})
