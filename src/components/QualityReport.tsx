import { profile } from '../data/profile'
import { Section } from './Section'

export const testSuites = [
  {
    name: 'Testes unitários e de componentes',
    tool: 'Vitest + Testing Library',
    detail: 'Cada seção é renderizada e validada a partir dos dados do currículo, incluindo testes de integridade dos dados.',
  },
  {
    name: 'Testes E2E',
    tool: 'Cypress',
    detail: 'Navegação, menu mobile, links de contato e conteúdo validados em um navegador real.',
  },
  {
    name: 'Acessibilidade',
    tool: 'cypress-axe (axe-core)',
    detail: 'Verificação automática das regras WCAG 2.1 níveis A e AA, no desktop e no mobile.',
  },
  {
    name: 'Integração contínua',
    tool: 'GitHub Actions',
    detail: 'Typecheck, testes e build a cada push. O deploy só acontece se todas as suítes passarem.',
  },
]

export function QualityReport() {
  return (
    <Section id="qualidade" tag="CT-06" title="Qualidade deste site">
      <p className="section-intro">
        Este portfólio também é um projeto de QA: ele é coberto por testes automatizados que rodam a cada
        alteração, e uma publicação só vai ao ar se todos passarem.
      </p>
      <ul className="suite-list">
        {testSuites.map((suite) => (
          <li key={suite.name} className="card suite" data-cy="suite">
            <div className="suite-head">
              <h3>{suite.name}</h3>
              <span className="status-pill">PASS</span>
            </div>
            <p className="suite-tool">{suite.tool}</p>
            <p className="muted">{suite.detail}</p>
          </li>
        ))}
      </ul>
      {profile.siteRepoUrl && (
        <a className="link-arrow" href={profile.siteRepoUrl} target="_blank" rel="noreferrer">
          Ver código e execuções dos testes no GitHub<span aria-hidden="true"> →</span>
        </a>
      )}
    </Section>
  )
}
