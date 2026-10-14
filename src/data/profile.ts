// Todo o conteúdo do portfólio fica aqui — edite este arquivo para atualizar o site.

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Project {
  title: string
  description: string
  tags: string[]
  /** Link do repositório no GitHub (opcional — o botão só aparece se preenchido). */
  repoUrl?: string
}

export interface Job {
  role: string
  company: string
  period: string
  highlights: string[]
}

export interface Certification {
  name: string
  issuer: string
  featured?: boolean
}

export interface Profile {
  name: string
  role: string
  headline: string
  location: string
  email: string
  /** Telefone/WhatsApp — deixado em branco por padrão para não expor o número a robôs. */
  phone?: string
  linkedinUrl?: string
  githubUrl?: string
  /** Link do repositório deste portfólio — exibido na seção "Qualidade deste site". */
  siteRepoUrl?: string
  summary: string
  contactMessage: string
  heroChecks: string[]
  education: { course: string; institution: string; conclusion: string }
  languages: { name: string; level: string }[]
  skills: SkillGroup[]
  projects: Project[]
  experience: Job[]
  certifications: Certification[]
}

export const profile: Profile = {
  name: 'Daniel Araújo Berriel',
  role: 'Analista de QA Jr',
  headline: 'QA Tester · Quality Assurance',
  location: 'Rio de Janeiro - RJ',
  email: 'danielberriel163@gmail.com',
  phone: undefined,
  linkedinUrl: undefined,
  githubUrl: 'https://github.com/DanielBerriel',
  siteRepoUrl: 'https://github.com/DanielBerriel/portfolio-qa-tester',

  summary:
    'Profissional formado em Análise e Desenvolvimento de Sistemas e certificado CTFL/ISTQB, com foco em ' +
    'Teste e Qualidade de Software. Conhecimentos em testes funcionais, exploratórios, regressivos, testes de API ' +
    'e automação E2E utilizando Cypress e Selenium. Perfil analítico, atenção aos detalhes e experiência com ' +
    'investigação, documentação e resolução de problemas técnicos.',

  contactMessage:
    'Estou em busca de oportunidades como Analista de QA. Se o seu time precisa de alguém atento aos detalhes ' +
    'para garantir a qualidade das entregas, vamos conversar!',

  heroChecks: [
    'é certificado CTFL/ISTQB',
    'automatiza testes E2E com Cypress e Selenium',
    'valida APIs REST com Postman',
    'documenta bugs e evidências no Jira',
    'trabalha com Scrum, Kanban e BDD',
  ],

  education: {
    course: 'Análise e Desenvolvimento de Sistemas',
    institution: 'Universidade Estácio de Sá',
    conclusion: '2025',
  },

  languages: [{ name: 'Inglês', level: 'Intermediário' }],

  skills: [
    {
      title: 'Qualidade de Software',
      items: [
        'Testes Funcionais',
        'Testes Exploratórios',
        'Regressão',
        'Testes Manuais',
        'Testes E2E',
        'Testes de API',
        'Casos e Cenários de Teste',
        'Planejamento de Testes',
        'Reporte de Bugs',
        'Gestão de Defeitos',
        'Critérios de Aceite',
        'Evidências de Teste',
        'Técnicas ISTQB',
      ],
    },
    {
      title: 'Ferramentas',
      items: ['Cypress', 'Selenium', 'Postman', 'Jira', 'Git', 'GitHub Actions', 'Docker', 'CI/CD'],
    },
    {
      title: 'Metodologias',
      items: ['Scrum', 'Kanban', 'BDD', 'Gherkin', 'Metodologias Ágeis'],
    },
    {
      title: 'Desenvolvimento',
      items: ['JavaScript', 'Java', 'Python', 'HTML', 'CSS', 'React'],
    },
    {
      title: 'Banco de Dados',
      items: ['SQL', 'PostgreSQL', 'Bancos Relacionais', 'MongoDB', 'Validação de dados com SQL'],
    },
  ],

  projects: [
    {
      title: 'Automação E2E com Cypress',
      description: 'Automação de testes ponta a ponta de aplicações web utilizando Cypress.',
      tags: ['Cypress', 'JavaScript', 'E2E'],
    },
    {
      title: 'Testes automatizados com Selenium',
      description: 'Testes automatizados para aplicações web com Selenium WebDriver.',
      tags: ['Selenium', 'Automação', 'Web'],
    },
    {
      title: 'Testes de API com Postman',
      description: 'Validação de regras de negócio e endpoints REST utilizando Postman.',
      tags: ['Postman', 'API REST', 'Regras de negócio'],
    },
    {
      title: 'Sistema de autenticação',
      description: 'Sistema de autenticação desenvolvido com Node.js e PostgreSQL, testado com Jest e integrado ao GitHub Actions.',
      tags: ['Node.js', 'PostgreSQL', 'Jest', 'GitHub Actions'],
    },
  ],

  experience: [
    {
      role: 'Técnico Especialista',
      company: 'Senhor Smart Nova Iguaçu',
      period: '2021 – 2023',
      highlights: [
        'Diagnóstico e análise de falhas em dispositivos móveis.',
        'Investigação e resolução de problemas técnicos de software e hardware.',
        'Elaboração de relatórios técnicos e documentação de atendimentos.',
        'Validação de funcionamento e qualidade após reparos realizados.',
      ],
    },
  ],

  certifications: [
    { name: 'CTFL — Certified Tester Foundation Level', issuer: 'ISTQB', featured: true },
    { name: 'GitHub Actions', issuer: 'Enap' },
    { name: 'Lógica de Programação e Algoritmos', issuer: 'BeCode' },
    { name: 'Desenvolvimento Web', issuer: 'Udemy' },
    { name: 'Excel do Básico ao Avançado', issuer: 'Udemy' },
  ],
}
