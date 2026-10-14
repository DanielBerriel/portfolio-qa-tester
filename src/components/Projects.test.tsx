import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile } from '../data/profile'
import { Projects } from './Projects'

describe('Projects', () => {
  it('renderiza um card por projeto do currículo', () => {
    render(<Projects />)

    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(profile.projects.length)

    profile.projects.forEach((project, index) => {
      expect(within(cards[index]).getByRole('heading', { name: project.title })).toBeInTheDocument()
    })
  })

  it('exibe o link do repositório apenas quando ele existe', () => {
    render(
      <Projects
        projects={[
          { title: 'Com repositório', description: 'a', tags: ['Cypress'], repoUrl: 'https://github.com/exemplo/repo' },
          { title: 'Sem repositório', description: 'b', tags: ['Postman'] },
        ]}
      />,
    )

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAccessibleName('Ver repositório de Com repositório')
    expect(links[0]).toHaveAttribute('href', 'https://github.com/exemplo/repo')
    expect(links[0]).toHaveAttribute('target', '_blank')
    expect(links[0]).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
  })
})
