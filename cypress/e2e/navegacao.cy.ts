import { navLinks } from '../../src/data/navigation'

/** A seção deve terminar a rolagem na metade de cima da tela, logo abaixo do cabeçalho fixo. */
const shouldBeScrolledIntoView = (selector: string) =>
  cy.window().then((win) => {
    cy.get(selector).should(($section) => {
      const { top } = $section[0].getBoundingClientRect()
      expect(top, `posição de ${selector} na tela`).to.be.within(-2, win.innerHeight / 2)
    })
  })

describe('Navegação', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('carrega a página com o título correto', () => {
    cy.title().should('eq', 'Daniel Araújo Berriel · Analista de QA')
  })

  navLinks.forEach(({ href, label }) => {
    it(`leva até a seção "${label}" pelo menu`, () => {
      cy.getByCy('nav').contains('a', label).click()

      cy.location('hash').should('eq', href)
      shouldBeScrolledIntoView(href)
    })
  })

  it('mantém o cabeçalho fixo no topo durante a rolagem', () => {
    cy.scrollTo('bottom')

    cy.getByCy('header')
      .should('be.visible')
      .then(($header) => {
        expect($header[0].getBoundingClientRect().top).to.eq(0)
      })
  })

  it('carrega a imagem do avatar no cabeçalho', () => {
    cy.getByCy('avatar')
      .should('be.visible')
      .and(($img) => {
        const img = $img[0] as HTMLImageElement
        expect(img.complete, 'imagem carregada').to.be.true
        expect(img.naturalWidth, 'largura real da imagem').to.be.greaterThan(0)
      })
  })

  it('volta ao início ao clicar no avatar do cabeçalho', () => {
    cy.scrollTo('bottom')
    cy.getByCy('brand').click()

    cy.location('hash').should('eq', '#inicio')
    cy.window().its('scrollY').should('be.lessThan', 10)
  })

  it('exibe o atalho "Pular para o conteúdo" ao navegar pelo teclado', () => {
    cy.getByCy('skip-link').then(($link) => {
      expect($link[0].getBoundingClientRect().bottom, 'escondido antes do foco').to.be.at.most(0)
    })

    cy.press(Cypress.Keyboard.Keys.TAB)

    cy.focused()
      .should('have.attr', 'data-cy', 'skip-link')
      .and(($link) => {
        expect($link[0].getBoundingClientRect().top, 'visível após o foco').to.be.at.least(0)
      })
      .click()
    cy.location('hash').should('eq', '#conteudo')
  })
})
