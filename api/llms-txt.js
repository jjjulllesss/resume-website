import { resumeData } from '../data.js';
import { generateLLMSTxt } from '../src/lib/markdown-generator.js';

export default function handler(req, res) {
  const markdown = generateLLMSTxt(resumeData);
  const tokenCount = Math.ceil(markdown.length / 4);

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('x-markdown-tokens', tokenCount.toString());
  res.setHeader('Vary', 'Accept');
  res.setHeader('Link', '<https://jules.sh/sitemap.xml>; rel="sitemap", <https://jules.sh/>; rel="canonical", <mailto:j.mermethusson@gmail.com>; rel="author", <https://jules.sh/index.html.md>; rel="describedby"; type="text/markdown"');

  return res.status(200).send(markdown);
}
