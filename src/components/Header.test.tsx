import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { navLinks } from '../data/navigation'
import { profile } from '../data/profile'
import { Header } from './Header'

describe('Header', () => {
  it('exibe o avatar como link de volta ao início, com texto alternativo', () => {
    render(<Header />)

    const homeLink = screen.getByRole('link', { name: `${profile.name}, voltar ao início` })
    expect(homeLink).toHaveAttribute('href', '#inicio')
    expect(within(homeLink).getByRole('img')).toHaveAttribute('src', expect.stringContaining('avatar'))
  })

  it('renderiza os links de navegação na ordem das seções', () => {
    render(<Header />)

    const nav = screen.getByRole('navigation', { name: 'Principal' })
    const hrefs = within(nav)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))

    expect(hrefs).toEqual(navLinks.map((link) => link.href))
  })

  it('abre e fecha o menu mobile pelo botão', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAccessibleName('Fechar menu')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('fecha o menu ao pressionar Esc', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    await user.click(toggle)
    await user.keyboard('{Escape}')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('fecha o menu ao escolher uma seção', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    await user.click(toggle)
    await user.click(screen.getByRole('link', { name: 'Projetos' }))

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
