import { profile, type Profile } from '../data/profile'
import { Section } from './Section'

type ContactInfo = Pick<Profile, 'email' | 'phone' | 'linkedinUrl' | 'githubUrl'>

interface ContactProps {
  contact?: ContactInfo
}

/** Converte "(21) 99999-9999" em link do WhatsApp com DDI do Brasil. */
export function whatsappLink(phone: string) {
  return `https://wa.me/55${phone.replace(/\D/g, '')}`
}

export function Contact({ contact = profile }: ContactProps) {
  const { email, phone, linkedinUrl, githubUrl } = contact

  return (
    <Section id="contato" tag="CT-07" title="Contato">
      <div className="card contact-card">
        <p className="contact-message">{profile.contactMessage}</p>
        <ul className="contact-list">
          <li>
            <span className="contact-label">E-mail</span>
            <a href={`mailto:${email}`} data-cy="contato-email">
              {email}
            </a>
          </li>
          {phone && (
            <li>
              <span className="contact-label">WhatsApp</span>
              <a href={whatsappLink(phone)} target="_blank" rel="noreferrer" data-cy="contato-whatsapp">
                {phone}
              </a>
            </li>
          )}
          {linkedinUrl && (
            <li>
              <span className="contact-label">LinkedIn</span>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" data-cy="contato-linkedin">
                {linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </li>
          )}
          {githubUrl && (
            <li>
              <span className="contact-label">GitHub</span>
              <a href={githubUrl} target="_blank" rel="noreferrer" data-cy="contato-github">
                {githubUrl.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </li>
          )}
        </ul>
      </div>
    </Section>
  )
}
