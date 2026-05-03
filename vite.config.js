import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://jules.sh',
      dynamicRoutes: []
    })
  ],
  resolve: {
    alias: {
      '@': join(process.cwd(), 'src'),
    }
  },
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
