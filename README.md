# Marp CLI Wrapper

A Node.js wrapper for [Marp CLI](https://marp.app/) designed for teams and organizations who want to create and share presentations quickly using Markdown, with consistent branding and reusable themes.

## 🚀 Why This Wrapper?

While Marp CLI is powerful on its own, this wrapper provides additional developer experience and automation:

### 🎨 **Pre-built Professional Themes**

- **Ready-to-use themes** with professional styling out-of-the-box
- **Two-column layouts**, highlight boxes, and code syntax highlighting
- **Easy theme switching** without complex CLI arguments

### 📁 **Team Collaboration & Reusability**

- **Fork-friendly structure** - Teams and organizations can fork this repo to create presentations side-by-side
- **Shared presentation components** - Reuse common slides, themes, and layouts across multiple presentations
- **Faster builds** - Leverage existing presentations to accelerate new ones
- **Consistent branding** - Maintain unified design across team presentations

### ⚡ **Enhanced CLI Experience**

- **Simplified commands** with parameterized scripts
- **pnpm** for fast, efficient package management

### 🛠️ **Developer Experience**

- **One-command generation**: `pnpm marp sample pdf <THEME>`
- **Automatic formatting** ensures consistent code style across all files
- **Ready-to-use examples** to get started immediately
- **Prettier + Husky** for automatic code formatting on commit

### 📦 **Production Ready**

- Git-ignored output files (no repository bloat)
- Well-structured folder organization
- Easy theme switching and customization

## Setup

Install dependencies:

```bash
pnpm install
```

## Usage

Generate presentations using the wrapper:

```bash
# Generate HTML version
pnpm marp sample html

# Generate PDF version
pnpm marp sample pdf
```

Format all files:

```bash
pnpm format
```

## Custom Themes

Themes are stored in the `themes/` folder. You can create your own themes or use the existing ones

### Using Custom Themes

```shell
# Generate with different themes
pnpm marp sample html dracula
pnpm marp sample html plato
```

### Creating Custom Themes

1. Create a new CSS file in the `themes/` directory
2. Use an existing theme as a template
3. Customize colors, fonts, and layouts to match your brand
4. Apply the theme by passing its name: `pnpm marp sample pdf <MY-NEW-THEME>`

## File Structure

```text
marp-cli-wrapper/
├── src/
│   └── generate.ts   # TypeScript CLI wrapper script
├── slides/           # Your presentation files (.md)
├── themes/           # Custom CSS themes
├── tsconfig.json     # TypeScript configuration
└── package.json      # Scripts and dependencies
```

## What This Wrapper Adds

- 🎨 **Pre-downloaded themes** for immediate results
- 🔧 **Simplified CLI** with memorable commands
- 📦 **Modern tooling** (pnpm, Prettier, Husky)
- 🚀 **Developer workflow** optimizations
- 📁 **Organized structure** for team collaboration

Start creating amazing presentations with enhanced Markdown tooling! 🎯

---

Built on top of [Marp CLI](https://github.com/marp-team/marp-cli/) - see official documentation for advanced features.
