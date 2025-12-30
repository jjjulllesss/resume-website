import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import { writeFileSync } from 'fs'

// #region agent log
const logData = {
  NODE_ENV: process.env.NODE_ENV,
  VITE_BASE_PATH: process.env.VITE_BASE_PATH,
  calculatedBase: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/resume/' : '/'),
  timestamp: Date.now(),
  sessionId: 'debug-session',
  runId: process.env.CI ? 'ci-build' : 'local-build',
  location: 'vite.config.js:base-calculation'
};
try {
  fetch('http://127.0.0.1:7242/ingest/cc283132-4b54-4181-a7f1-76a508e09c6a', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...logData, message: 'Base path calculation', data: logData })
  }).catch(() => {});
} catch (e) {}
// #endregion

const basePath = process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/resume/' : '/');

// #region agent log
try {
  fetch('http://127.0.0.1:7242/ingest/cc283132-4b54-4181-a7f1-76a508e09c6a', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'vite.config.js:final-base',
      message: 'Final base path selected',
      data: { basePath, NODE_ENV: process.env.NODE_ENV, VITE_BASE_PATH: process.env.VITE_BASE_PATH },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: process.env.CI ? 'ci-build' : 'local-build',
      hypothesisId: 'A'
    })
  }).catch(() => {});
} catch (e) {}
// #endregion

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(process.cwd(), 'src'),
    }
  },
  base: basePath,
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
