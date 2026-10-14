import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4173',
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents(on) {
      // Exibe no terminal as violações de acessibilidade encontradas pelo cypress-axe
      on('task', {
        log(message: string) {
          console.log(message)
          return null
        },
        table(rows: unknown[]) {
          console.table(rows)
          return null
        },
      })
    },
  },
})
