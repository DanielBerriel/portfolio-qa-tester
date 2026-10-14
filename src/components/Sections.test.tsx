import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile } from '../data/profile'
import { About } from './About'
import { Education } from './Education'
import { Experience } from './Experience'
import { QualityReport, testSuites } from './QualityReport'
import { Skills } from './Skills'

describe('Seções de conteúdo', () => {
  it('Sobre: exibe o resumo profissional e a certificação em destaque', () => {
    render(<About />)

    const featured = profile.certifications.find((cert) => cert.featured)!

    expect(screen.getByText(profile.summary)).toBeInTheDocument()
    expect(screen.getByText(`${featured.name} · ${featured.issuer}`)).toBeInTheDocument()
  })

  it('Competências: exibe todos os grupos e todas as competências', () => {
    render(<Skills />)

    for (const group of profile.skills) {
      const card = screen.getByRole('heading', { name: group.title }).closest('article')!
      expect(within(card).getAllByRole('listitem').map((item) => item.textContent)).toEqual(group.items)
    }
  })

  it('Experiência: exibe cargo, empresa, período e atividades', () => {
    render(<Experience />)

    for (const job of profile.experience) {
      expect(screen.getByRole('heading', { name: new RegExp(job.role) })).toHaveTextContent(job.company)
      expect(screen.getByText(job.period)).toBeInTheDocument()
      for (const highlight of job.highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument()
      }
    }
  })

  it('Formação: exibe a graduação e todas as certificações', () => {
    render(<Education />)

    expect(screen.getByRole('heading', { name: profile.education.course })).toBeInTheDocument()
    const certs = within(screen.getByRole('list', { name: 'Certificações e cursos' })).getAllByRole('listitem')
    expect(certs).toHaveLength(profile.certifications.length)
  })

  it('Qualidade: lista cada suíte de testes com status PASS', () => {
    render(<QualityReport />)

    for (const suite of testSuites) {
      const card = screen.getByRole('heading', { name: suite.name }).closest('li')!
      expect(within(card).getByText('PASS')).toBeInTheDocument()
      expect(within(card).getByText(suite.tool)).toBeInTheDocument()
    }
  })
})
