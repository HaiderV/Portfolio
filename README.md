# Haider Vadgamwala — Portfolio

A responsive personal portfolio built with React and Vite. It includes an animated hero, About, Education, Skills, Projects, Experience, Resume, Contact, and Footer sections.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

Run these commands from the `frontend` directory:

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Three.js, React Three Fiber, and Drei for the desktop glass scene
- Lucide React for interface icons
- EmailJS Browser SDK for the contact form

The glass scene is not rendered on small screens to reduce mobile GPU load.

## Contact form

The contact form sends messages directly through EmailJS; it does not require a custom backend. Its service ID, template ID, and public key are configured in `src/components/ContactSection.jsx`.

In the EmailJS dashboard:

1. Configure an email service and a template.
2. Make sure the template uses the form fields `name`, `email`, `subject`, and `message`.
3. Restrict allowed origins and configure anti-spam protections for the public key.

## Project structure

```text
src/
  assets/       Images, logos, and icon data
  components/   Portfolio sections and reusable UI
  App.jsx       Page section order
  main.jsx      Application entry point and global styles
public/         Static public assets
```

Update the section components under `src/components/` to edit portfolio content. The header navigation uses section IDs, so keep those IDs in sync when renaming or adding sections.
