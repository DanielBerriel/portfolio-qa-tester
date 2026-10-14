import { profile } from '../data/profile'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experiencia" tag="CT-04" title="Experiência profissional">
      <ol className="timeline">
        {profile.experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="timeline-item" data-cy="experiencia">
            <div className="timeline-head">
              <h3>
                {job.role} <span className="timeline-company">· {job.company}</span>
              </h3>
              <p className="period">{job.period}</p>
            </div>
            <ul className="bullets">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
