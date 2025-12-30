import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(process.cwd(), 'src'),
    }
  },
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/resume/' : '/'),
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
