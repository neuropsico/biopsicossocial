import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        avaliacao: resolve(__dirname, 'avaliacao.html'),
        resultado: resolve(__dirname, 'resultado.html'),
      }
    }
  }
})
