export function generateMarkdown(resumeData) {
  let md = `# ${resumeData.name}\n\n`;
  md += `**${resumeData.role}**\n`;
  md += `${resumeData.location}\n\n`;

  md += `## About\n\n${resumeData.bio}\n\n`;

  md += `## Experience\n\n`;
  resumeData.career.forEach(company => {
    md += `### ${company.company}\n\n`;
    company.positions.forEach(pos => {
      md += `**${pos.position}** | ${pos.period}\n\n`;
      md += `${pos.description}\n\n`;
    });
  });

  md += `## Education\n\n`;
  resumeData.education.forEach(edu => {
    md += `### ${edu.institution}\n\n`;
    md += `**${edu.degree}**\n`;
    if (edu.field) md += `*${edu.field}*\n`;
    md += `${edu.period} | ${edu.location}\n\n`;
    md += `${edu.description}\n\n`;
  });

  md += `## Activities\n\n`;
  resumeData.activities.forEach(activity => {
    const typeLabel = activity.type === 'blog-post' ? 'Blog Post' :
                     activity.type === 'talks' ? 'Talk' :
                     activity.type.charAt(0).toUpperCase() + activity.type.slice(1);
    md += `- **[${typeLabel}] ${activity.title}** (${activity.date})\n`;
    if (activity.details) md += `  ${activity.details}\n`;
    if (activity.link) md += `  [Link](${activity.link})\n`;
    md += `\n`;
  });

  md += `## Links\n\n`;
  resumeData.socialLinks.forEach(link => {
    md += `- [${link.platform}](${link.url})\n`;
  });

  return md.trim();
}

export function generateLLMSTxt(resumeData) {
  let md = `# ${resumeData.name}\n\n`;
  md += `> ${resumeData.bio}\n\n`;

  md += `## Resume\n\n`;
  md += `- [Full Resume](https://jules.sh/index.html.md): Complete professional background, experience, and education in Markdown format.\n\n`;

  md += `## Social Links\n\n`;
  resumeData.socialLinks.forEach((link) => {
    md += `- [${link.platform}](${link.url})\n`;
  });

  return md.trim();
}
