import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { QualityReport } from './components/QualityReport'
import { Skills } from './components/Skills'
import { resumeUrl } from './data/resume'

export function App() {
  return (
    <>
      <a href="#conteudo" className="skip-link" data-cy="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero resumeUrl={resumeUrl} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <QualityReport />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
