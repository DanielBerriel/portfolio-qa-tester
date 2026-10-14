import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  /** Identificador exibido acima do título, no formato de um caso de teste (ex.: CT-01). */
  tag: string
  title: string
  children: ReactNode
}

export function Section({ id, tag, title, children }: SectionProps) {
  const headingId = `${id}-titulo`

  return (
    <section id={id} className="section" aria-labelledby={headingId} data-cy={`secao-${id}`}>
      <div className="container">
        <header className="section-header">
          <p className="section-tag">{tag}</p>
          <h2 id={headingId}>{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}
