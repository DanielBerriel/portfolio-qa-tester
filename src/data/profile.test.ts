import { describe, expect, it } from 'vitest'
import { profile } from './profile'

const hasDuplicates = (values: string[]) => new Set(values).size !== values.length

describe('Integridade dos dados do perfil', () => {
  it('possui um e-mail em formato válido', () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('usa apenas HTTPS nos links externos preenchidos', () => {
    const urls = [
      profile.linkedinUrl,
      profile.githubUrl,
      profile.siteRepoUrl,
      ...profile.projects.map((project) => project.repoUrl),
    ].filter((url): url is string => Boolean(url))

    for (const url of urls) {
      expect(url).toMatch(/^https:\/\//)
    }
  })

  it('não repete competências dentro de um mesmo grupo', () => {
    for (const group of profile.skills) {
      expect(hasDuplicates(group.items), `competência repetida em "${group.title}"`).toBe(false)
    }
  })

  it('não repete títulos usados como chave na renderização', () => {
    expect(hasDuplicates(profile.skills.map((group) => group.title))).toBe(false)
    expect(hasDuplicates(profile.projects.map((project) => project.title))).toBe(false)
    expect(hasDuplicates(profile.certifications.map((cert) => cert.name))).toBe(false)
    expect(hasDuplicates(profile.heroChecks)).toBe(false)
  })

  it('informa ao menos uma tecnologia em cada projeto', () => {
    for (const project of profile.projects) {
      expect(project.tags.length, `projeto "${project.title}" sem tecnologias`).toBeGreaterThan(0)
    }
  })

  it('destaca exatamente uma certificação', () => {
    expect(profile.certifications.filter((cert) => cert.featured)).toHaveLength(1)
  })
})
