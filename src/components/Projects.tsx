import { profile, type Project } from '../data/profile'
import { Section } from './Section'

interface ProjectsProps {
  projects?: Project[]
}

export function Projects({ projects = profile.projects }: ProjectsProps) {
  return (
    <Section id="projetos" tag="CT-03" title="Projetos">
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.title} className="card project-card" data-cy="projeto">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul className="chips chips-sm" aria-label={`Tecnologias de ${project.title}`}>
              {project.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
            {project.repoUrl && (
              <a className="link-arrow" href={project.repoUrl} target="_blank" rel="noreferrer">
                Ver repositório <span className="sr-only">de {project.title}</span>
                <span aria-hidden="true"> →</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
