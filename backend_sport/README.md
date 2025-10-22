# Sport Contact Backend

This small backend accepts contact form submissions and sends them to `jatinkavani877@gmail.com`.

Setup

1. Copy `.env.example` to `.env` and fill EMAIL_USER and EMAIL_PASS (and optionally SMTP_HOST/SMTP_PORT/SMTP_SECURE).
2. Run `npm install` in `backend_sport`.
3. Start with `npm run dev` (requires nodemon) or `npm start`.

Deploying to Vercel

- Vercel supports serverless functions placed under the `api/` directory. This repo includes `api/contact.js` which exposes the same functionality as the old Express server.
- Add the following environment variables in your Vercel project settings (Dashboard -> Project -> Settings -> Environment Variables):
	- EMAIL_USER (your SMTP username/email)
	- EMAIL_PASS (your SMTP password / app password)
	- CONTACT_RECEIVER (optional recipient, defaults to `jatinkavani877@gmail.com`)
	- SMTP_HOST (optional, default `smtp.gmail.com`)
	- SMTP_PORT (optional, default `465`)
	- SMTP_SECURE (optional, `true` or `false`, default `true`)

Local testing of serverless function

- You can run `vercel dev` to test serverless functions locally (install Vercel CLI separately).
- Alternatively, the original `server.js` can still be run locally with `npm start`.

Frontend

Set `VITE_CONTACT_API_URL` in the frontend environment (e.g., project root `.env.local`) to the deployed endpoint, for example:

VITE_CONTACT_API_URL=https://<your-vercel-project>.vercel.app/api/contact
