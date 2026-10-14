import { profile } from '../data/profile'
import { Section } from './Section'

export function Education() {
  const { course, institution, conclusion } = profile.education

  return (
    <Section id="formacao" tag="CT-05" title="Formação e certificações">
      <div className="education-grid">
        <article className="card degree-card" data-cy="graduacao">
          <p className="card-label">Graduação</p>
          <h3>{course}</h3>
          <p className="muted">
            {institution} · Conclusão em {conclusion}
          </p>
        </article>

        <ul className="cert-list" aria-label="Certificações e cursos">
          {profile.certifications.map((cert) => (
            <li key={cert.name} className={cert.featured ? 'cert cert-featured' : 'cert'} data-cy="certificacao">
              <span className="cert-name">{cert.name}</span>
              <span className="cert-issuer">{cert.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
