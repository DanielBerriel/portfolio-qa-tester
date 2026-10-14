import { profile } from '../data/profile'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="competencias" tag="CT-02" title="Competências técnicas">
      <div className="skills-grid">
        {profile.skills.map((group) => (
          <article key={group.title} className="card skill-card" data-cy="grupo-competencia">
            <h3>{group.title}</h3>
            <ul className="chips">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
