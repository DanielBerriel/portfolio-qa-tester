import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { navLinks } from './data/navigation'

describe('App', () => {
  it('tem uma seção de destino para cada link do menu', () => {
    const { container } = render(<App />)

    for (const link of navLinks) {
      expect(container.querySelector(link.href), `seção ${link.href} não encontrada`).toBeInTheDocument()
    }
  })

  it('segue a hierarquia de títulos: um h1 e um h2 por seção', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      'Sobre mim',
      'Competências técnicas',
      'Projetos',
      'Experiência profissional',
      'Formação e certificações',
      'Qualidade deste site',
      'Contato',
    ])
  })

  it('oferece um link para pular direto ao conteúdo principal', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute('href', '#conteudo')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'conteudo')
  })
})
