import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Contact, whatsappLink } from './Contact'

describe('Contact', () => {
  it('exibe apenas o e-mail quando os outros contatos não estão preenchidos', () => {
    render(<Contact contact={{ email: 'qa@exemplo.com' }} />)

    expect(screen.getByRole('link', { name: 'qa@exemplo.com' })).toHaveAttribute('href', 'mailto:qa@exemplo.com')
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('exibe WhatsApp, LinkedIn e GitHub quando preenchidos', () => {
    render(
      <Contact
        contact={{
          email: 'qa@exemplo.com',
          phone: '(21) 91234-5678',
          linkedinUrl: 'https://www.linkedin.com/in/exemplo',
          githubUrl: 'https://github.com/exemplo',
        }}
      />,
    )

    expect(screen.getByRole('link', { name: '(21) 91234-5678' })).toHaveAttribute(
      'href',
      'https://wa.me/5521912345678',
    )
    expect(screen.getByRole('link', { name: 'linkedin.com/in/exemplo' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/exemplo',
    )
    expect(screen.getByRole('link', { name: 'github.com/exemplo' })).toHaveAttribute('href', 'https://github.com/exemplo')
  })

  it.each([
    ['(21) 91234-5678', 'https://wa.me/5521912345678'],
    ['21 91234 5678', 'https://wa.me/5521912345678'],
    ['21912345678', 'https://wa.me/5521912345678'],
  ])('converte "%s" em link do WhatsApp', (phone, expected) => {
    expect(whatsappLink(phone)).toBe(expected)
  })
})
