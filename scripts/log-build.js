import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// #region agent log
const logEndpoint = 'http://127.0.0.1:7242/ingest/cc283132-4b54-4181-a7f1-76a508e09c6a';
const logData = {
  location: 'scripts/log-build.js:check-html',
  message: 'Checking built HTML for asset paths',
  timestamp: Date.now(),
  sessionId: 'debug-session',
  runId: process.env.CI ? 'ci-build' : 'local-build',
  hypothesisId: 'C'
};

const htmlPath = join(process.cwd(), 'dist', 'index.html');
if (existsSync(htmlPath)) {
  const html = readFileSync(htmlPath, 'utf-8');
  const scriptMatches = html.match(/src="([^"]+)"/g) || [];
  const linkMatches = html.match(/href="([^"]+)"/g) || [];
  const assetPaths = [...scriptMatches, ...linkMatches].filter(p => p.includes('assets'));
  
  logData.data = {
    htmlExists: true,
    assetPaths,
    allScripts: scriptMatches,
    allLinks: linkMatches,
    basePathDetected: assetPaths[0]?.match(/^\/([^\/]+)\//)?.[1] || 'none'
  };
} else {
  logData.data = { htmlExists: false, error: 'dist/index.html not found' };
}

try {
  fetch(logEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logData)
  }).catch(() => {});
} catch (e) {}
// #endregion
