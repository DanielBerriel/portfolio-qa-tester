describe('Menu mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
    cy.visit('/')
  })

  it('esconde os links atrás do botão de menu', () => {
    cy.getByCy('nav').should('not.be.visible')
    cy.getByCy('menu-toggle').should('be.visible').and('have.attr', 'aria-expanded', 'false')
  })

  it('abre o menu, navega até a seção e fecha automaticamente', () => {
    cy.getByCy('menu-toggle').click()
    cy.getByCy('nav').should('be.visible')

    cy.getByCy('nav').contains('a', 'Contato').click()

    cy.location('hash').should('eq', '#contato')
    cy.getByCy('nav').should('not.be.visible')
    cy.getByCy('menu-toggle').should('have.attr', 'aria-expanded', 'false')
  })

  it('fecha o menu com a tecla Esc', () => {
    cy.getByCy('menu-toggle').click()
    cy.getByCy('nav').should('be.visible')

    cy.get('body').type('{esc}')

    cy.getByCy('nav').should('not.be.visible')
  })
})

describe('Menu desktop', () => {
  it('mostra os links direto no cabeçalho, sem botão de menu', () => {
    cy.viewport(1280, 800)
    cy.visit('/')

    cy.getByCy('nav').should('be.visible')
    cy.getByCy('menu-toggle').should('not.be.visible')
  })
})

describe('Layout responsivo', () => {
  const presets: Cypress.ViewportPreset[] = ['iphone-se2', 'iphone-x', 'ipad-2', 'macbook-13']

  presets.forEach((preset) => {
    it(`não gera rolagem horizontal em ${preset}`, () => {
      cy.viewport(preset)
      cy.visit('/')

      cy.document().then((doc) => {
        const { scrollWidth, clientWidth } = doc.documentElement
        expect(scrollWidth, 'largura do conteúdo').to.be.at.most(clientWidth)
      })
    })
  })
})
