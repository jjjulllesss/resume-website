import { resumeData } from '../data.js';
import { generateMarkdown } from '../src/lib/markdown-generator.js';

export default function handler(req, res) {
  const accept = req.headers.accept || '';

  if (accept.includes('text/markdown')) {
    const markdown = generateMarkdown(resumeData);
    const tokenCount = Math.ceil(markdown.length / 4);

    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('x-markdown-tokens', tokenCount.toString());
    res.setHeader('Link', '<https://jules.sh/sitemap.xml>; rel="sitemap", <https://jules.sh/>; rel="canonical", <mailto:j.mermethusson@gmail.com>; rel="author", <https://jules.sh/index.html.md>; rel="describedby"; type="text/markdown", <https://jules.sh/llms.txt>; rel="help"; type="text/markdown"');
    res.setHeader('Vary', 'Accept');
    return res.status(200).send(markdown);
  }

  return res.status(404).send('Not Found');
}
