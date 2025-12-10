import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://api.sergelitim.uz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/s_api'),
      },
    },
  },
})