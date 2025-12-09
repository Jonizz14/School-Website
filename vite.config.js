import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://95.46.96.45',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/s_api'),
      },
    },
  },
})