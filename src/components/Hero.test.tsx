import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile } from '../data/profile'
import { Hero } from './Hero'

describe('Hero', () => {
  it('apresenta nome e cargo', () => {
    render(<Hero resumeUrl={undefined} />)

    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
    expect(screen.getByText(profile.role, { selector: '.hero-role' })).toBeInTheDocument()
  })

  it('mostra um check por qualificação e o total de testes "passing"', () => {
    render(<Hero resumeUrl={undefined} />)

    const terminal = screen.getByRole('figure')
    expect(within(terminal).getAllByRole('listitem')).toHaveLength(profile.heroChecks.length)
    expect(within(terminal).getByText(`${profile.heroChecks.length} passing`)).toBeInTheDocument()
  })

  it('exibe o botão de download quando há currículo em PDF', () => {
    render(<Hero resumeUrl="/assets/curriculo.pdf" />)

    const link = screen.getByRole('link', { name: 'Baixar currículo' })
    expect(link).toHaveAttribute('href', '/assets/curriculo.pdf')
    expect(link).toHaveAttribute('download')
  })

  it('oculta o botão de download quando não há currículo', () => {
    render(<Hero resumeUrl={undefined} />)

    expect(screen.queryByRole('link', { name: 'Baixar currículo' })).not.toBeInTheDocument()
  })
})
