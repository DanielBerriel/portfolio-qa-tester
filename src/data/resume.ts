// Procura um PDF em src/assets/curriculo/. Se existir, o Vite gera a URL final no build;
// se a pasta estiver vazia, resumeUrl fica undefined e o botão de download não é exibido.
const pdfs = import.meta.glob<string>('../assets/curriculo/*.pdf', {
  query: '?url',
  import: 'default',
  eager: true,
})

export const resumeUrl: string | undefined = Object.values(pdfs)[0]
