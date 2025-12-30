# Resume Website

A modern, responsive resume website built with React, Vite, Tailwind CSS, and shadcn/ui components. Features a clean design with dark mode support, automatic Medium post integration, and easy content management.

![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **📸 Profile Section**: Picture with download button, name, role, and social media links
- **📝 Bio Section**: Short bio with copy-to-clipboard functionality
- **💼 Experience & Education**: Tabbed interface for work experience and education history
- **🏆 Activities**: Filterable section for certifications, blog posts, and public speaking
- **📰 Medium Integration**: Automatically fetches and displays your latest Medium posts
- **🌙 Dark Mode**: Toggle between light and dark themes with persistent preference
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **⚡ Easy Maintenance**: Update all content through a single `data.js` file
- **🎨 shadcn/ui Components**: Beautiful, accessible UI components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-website.git
   cd resume-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your images**
   - Place all images (profile picture, company logos, education logos) in the `public/` directory
   - Update image paths in `data.js` to use `/filename.ext` format (e.g., `/Jules_Mermet-Husson.jpg`)

4. **Update your information**
   - Open `data.js` and update all the fields:
     - Personal information (name, role)
     - Social media links
     - Bio text
     - Career history (supports multiple positions per company)
     - Education history
     - Activities (certifications, blog posts, public speaking)
     - Medium username

5. **Start development server**
   ```bash
   npm run dev
   ```
   Open your browser to the URL shown (usually `http://localhost:5173`)

6. **Build for production**
   ```bash
   npm run build
   ```
   The built files will be in the `dist` directory, ready to deploy.

## 📁 Project Structure

```
resume-website/
├── public/                  # Static assets (images, etc.)
│   ├── Jules_Mermet-Husson.jpg
│   ├── ateme.png
│   ├── esf.jpeg
│   └── ...
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components (Button, Card, Badge)
│   ├── lib/
│   │   └── utils.js         # Utility functions (cn helper)
│   ├── App.jsx              # Main React component
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind CSS styles and theme variables
├── data.js                  # Resume data (UPDATE THIS!)
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.js           # Vite configuration
├── .gitignore               # Git ignore rules
├── LICENSE                  # MIT License
└── README.md                # This file
```

## 🎨 Customization

### Colors & Theme
Edit the CSS variables in `src/index.css` to change the color scheme:
```css
:root {
  --primary: 0 0% 9%;
  --background: 0 0% 100%;
  /* ... other colors ... */
}

.dark {
  --background: 0 0% 3.9%;
  /* ... dark mode colors ... */
}
```

### Components
All components use shadcn/ui and are located in `src/components/ui/`. They're highly customizable and follow the shadcn/ui design system.

### Data Structure
All content is managed through `data.js`. The structure supports:
- Multiple positions per company
- Education history with institutions
- Activities with filtering (certifications, blog posts, public speaking)
- Medium blog post integration

## 🚢 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist` folder to the `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import your GitHub repository
2. Vite will be auto-detected
3. Deploy!

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/resume-website/issues).

## 👤 Author

**Jules MERMET-HUSSON**
- LinkedIn: [@jmermethusson](https://www.linkedin.com/in/jmermethusson/)
- GitHub: [@jjjulllesss](https://github.com/jjjulllesss)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool
