import type { CSSProperties } from 'react'
import { profile } from '../data/profile'

interface HeroProps {
  /** URL do PDF do currículo; sem ela o botão de download não aparece. */
  resumeUrl: string | undefined
}

export function Hero({ resumeUrl }: HeroProps) {
  const checks = profile.heroChecks

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-titulo" data-cy="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{profile.headline}</p>
          <h1 id="hero-titulo">{profile.name}</h1>
          <p className="hero-role" data-cy="hero-cargo">
            {profile.role}
          </p>
          <p className="hero-lead">
            Testes funcionais, exploratórios, de API e automação E2E para que o software chegue ao usuário
            fazendo exatamente o que promete.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projetos">
              Ver projetos
            </a>
            <a className="button button-ghost" href="#contato">
              Entrar em contato
            </a>
            {resumeUrl && (
              <a className="button button-ghost" href={resumeUrl} download data-cy="baixar-curriculo">
                Baixar currículo
              </a>
            )}
          </div>
        </div>

        <figure className="terminal" data-cy="hero-terminal">
          <div className="terminal-bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="terminal-body">
            <p className="terminal-cmd">
              <span className="terminal-prompt" aria-hidden="true">
                $
              </span>{' '}
              npx cypress run --spec daniel.cy.ts
            </p>
            <p className="terminal-suite">
              {profile.name} — {profile.role}
            </p>
            <ul className="terminal-checks">
              {checks.map((check, index) => (
                <li key={check} style={{ '--i': index } as CSSProperties}>
                  <span className="pass" aria-hidden="true">
                    ✓
                  </span>{' '}
                  {check}
                </li>
              ))}
            </ul>
            <p className="terminal-summary" style={{ '--i': checks.length } as CSSProperties}>
              <span className="pass" data-cy="hero-passing">
                {checks.length} passing
              </span>{' '}
              <span className="terminal-muted">(0 failing)</span>
            </p>
          </div>
          <figcaption className="sr-only">
            Execução de testes ilustrativa com as principais qualificações de {profile.name}.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
