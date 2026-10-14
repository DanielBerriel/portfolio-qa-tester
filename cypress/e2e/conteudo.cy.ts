import { profile } from '../../src/data/profile'

describe('Conteúdo do currículo', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('apresenta nome, cargo e resumo profissional', () => {
    cy.getByCy('hero').within(() => {
      cy.get('h1').should('have.text', profile.name)
      cy.getByCy('hero-cargo').should('have.text', profile.role)
    })
    cy.getByCy('resumo').should('have.text', profile.summary)
  })

  it('o terminal do topo termina com todos os testes passando', () => {
    cy.getByCy('hero-terminal').find('li').should('have.length', profile.heroChecks.length)
    cy.getByCy('hero-passing').should('have.text', `${profile.heroChecks.length} passing`)
  })

  it('lista todas as competências técnicas', () => {
    cy.getByCy('grupo-competencia')
      .should('have.length', profile.skills.length)
      .each(($card, index) => {
        const group = profile.skills[index]
        cy.wrap($card).find('h3').should('have.text', group.title)
        cy.wrap($card).find('li').should('have.length', group.items.length)
      })
  })

  it('exibe os projetos com suas tecnologias', () => {
    cy.getByCy('projeto')
      .should('have.length', profile.projects.length)
      .each(($card, index) => {
        const project = profile.projects[index]
        cy.wrap($card).find('h3').should('have.text', project.title)
        project.tags.forEach((tag) => {
          cy.wrap($card).contains('li', tag)
        })
      })
  })

  it('exibe experiência, graduação e certificações', () => {
    cy.getByCy('experiencia').should('have.length', profile.experience.length)
    cy.getByCy('graduacao')
      .should('contain.text', profile.education.course)
      .and('contain.text', profile.education.institution)
    cy.getByCy('certificacao').should('have.length', profile.certifications.length)
  })

  it('o e-mail de contato abre o cliente de e-mail', () => {
    cy.getByCy('contato-email')
      .should('have.text', profile.email)
      .and('have.attr', 'href', `mailto:${profile.email}`)
  })

  it('links externos usam HTTPS e abrem em nova aba com segurança', () => {
    cy.document().then((doc) => {
      doc.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((link) => {
        expect(link.href, link.textContent ?? '').to.match(/^https:\/\//)
        expect(link.rel, link.textContent ?? '').to.include('noreferrer')
      })
    })
  })

  it('o botão "Baixar currículo" entrega um arquivo PDF', function () {
    cy.document().then((doc) => {
      const link = doc.querySelector<HTMLAnchorElement>('[data-cy="baixar-curriculo"]')
      // O botão só existe quando há um PDF em src/assets/curriculo/
      if (!link) this.skip()

      cy.request(link.href).its('headers.content-type').should('include', 'application/pdf')
    })
  })
})
