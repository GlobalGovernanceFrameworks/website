# Global Governance Framework Website

This repository contains the source code for the Global Governance Framework website, a platform dedicated to developing and sharing frameworks for governance interoperability and meta-governance structures.

## Project Vision

The Global Governance Framework project aims to create tools, patterns, and frameworks that enable different governance systems to interoperate, share lessons, and evolve together. Rather than proposing a single governance solution, we're building infrastructure that allows many models to coexist, communicate, and collaborate.

## Technologies

- **Frontend**: SvelteKit, Tailwind CSS
- **Internationalization**: Custom i18n implementation
- **Form Handling**: Formspree
- **Deployment**: [TBD]

## Development Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:GlobalGovernanceFramework/governance-framework-site.git
cd governance-framework-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev -- --open
```

### Internationalization

The website supports multiple languages through a custom i18n implementation. Translation files are stored in `src/lib/i18n/[language-code]/`.

To add or modify translations:
1. Find the appropriate JSON file in the language directory
2. Update or add new translation keys
3. Ensure all languages have the same translation keys

### Tailwind CSS Setup

If you encounter issues with Tailwind CSS, follow these steps to fix:

```bash
# Uninstall current Tailwind packages
npm uninstall tailwindcss postcss autoprefixer @tailwindcss/typography @tailwindcss/forms

# Install fresh versions
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography @tailwindcss/forms

# Initialize Tailwind with the proper configuration
npx tailwindcss init -p
```

Then update the `tailwind.config.js` file:

```javascript
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

## Project Structure

```
├── src/
│   ├── app.css           # Main CSS file with Tailwind directives
│   ├── app.html          # HTML template
│   ├── lib/
│   │   ├── components/   # Reusable Svelte components
│   │   ├── i18n/         # Internationalization system
│   ├── routes/           # SvelteKit pages
├── static/               # Static assets
├── svelte.config.js      # SvelteKit configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[TBD]

## Contact

Email: globalgovernanceframework@gmail.com
GitHub: https://github.com/GlobalGovernanceFramework
