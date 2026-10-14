import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="site-footer" data-cy="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="muted">Feito com React · testado com Vitest e Cypress</p>
      </div>
    </footer>
  )
}
