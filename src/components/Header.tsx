import { useEffect, useState } from 'react'
import avatarUrl from '../assets/avatar.jpg'
import { navLinks } from '../data/navigation'
import { profile } from '../data/profile'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header" data-cy="header">
      <div className="container header-inner">
        <a href="#inicio" className="brand" data-cy="brand">
          <img
            src={avatarUrl}
            alt={`${profile.name}, voltar ao início`}
            width={48}
            height={48}
            className="brand-avatar"
            data-cy="avatar"
          />
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((open) => !open)}
          data-cy="menu-toggle"
        >
          <span className="menu-icon" aria-hidden="true" />
        </button>

        <nav
          id="menu-principal"
          aria-label="Principal"
          className={menuOpen ? 'nav nav-open' : 'nav'}
          data-cy="nav"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
