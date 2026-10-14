import { profile } from '../data/profile'
import { Section } from './Section'

export function About() {
  const featuredCert = profile.certifications.find((cert) => cert.featured)

  const facts = [
    { label: 'Localização', value: profile.location },
    { label: 'Formação', value: `${profile.education.course} (${profile.education.conclusion})` },
    ...(featuredCert ? [{ label: 'Certificação', value: `${featuredCert.name} · ${featuredCert.issuer}` }] : []),
    {
      label: 'Idiomas',
      value: profile.languages.map((language) => `${language.name} — ${language.level}`).join(', '),
    },
  ]

  return (
    <Section id="sobre" tag="CT-01" title="Sobre mim">
      <div className="about-grid">
        <p className="about-summary" data-cy="resumo">
          {profile.summary}
        </p>
        <dl className="facts">
          {facts.map((fact) => (
            <div key={fact.label} className="fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
