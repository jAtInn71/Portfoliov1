# Sport Contact Backend

This small backend accepts contact form submissions and sends them to `jatinkavani877@gmail.com`.

Setup

1. Copy `.env.example` to `.env` and fill EMAIL_USER and EMAIL_PASS.
2. Run `npm install` in `backend_sport`.
3. Start with `npm run dev` (requires nodemon) or `npm start`.

Frontend

Set `VITE_CONTACT_API_URL` in the frontend environment (e.g., project root `.env.local`) to the sport backend URL, for example:

VITE_CONTACT_API_URL=http://localhost:5100
