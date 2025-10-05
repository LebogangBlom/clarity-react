# Clarity React

This repository contains a small React site (Vite) with a contact form configured for Netlify Forms.

## Deploying to Netlify

1. Push this repository to GitHub (create a remote repo and push). See instructions below.
2. On Netlify, click "New site from Git" and connect your GitHub account.
3. Select this repository and use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Netlify will build and deploy your site.

Notes about forms and reCAPTCHA

- The contact form uses Netlify Forms. Netlify will detect the form during deploy and register submissions.
- For Netlify reCAPTCHA, enable reCAPTCHA in Netlify site settings and follow Netlify's documentation for site keys.

Local development

- Run the dev server:

```bash
npm install
npm run dev
```

Testing

- Run unit tests (Vitest):

```bash
npm install
npm test
```

Contact function

- A placeholder Netlify Function is included at `netlify/functions/contact.js` to receive JSON POSTs. Implement your processing logic there.
