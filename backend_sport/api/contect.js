// Vercel serverless function for contact form
// Works on Vercel and locally (when NODE_ENV !== 'production' and a .env file is present)
if (process.env.NODE_ENV !== 'production') {
  try { require('dotenv').config(); } catch (e) { /* ignore */ }
}

const nodemailer = require('nodemailer');

// Simple CORS helper for serverless functions
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '').substring(0, 1000);
}

// create transporter using SMTP so it's generally compatible
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER or EMAIL_PASS not set');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });
}

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.json({ success: true, message: 'Sport backend contact endpoint (serverless)' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    console.log('Incoming /api/contact POST body:', JSON.stringify(body));

    const { name, email, subject, message, phone } = body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const safeName = sanitizeInput(name);
    const safeEmail = sanitizeInput(email);
    const safeSubject = sanitizeInput(subject || '');
    const safeMessage = sanitizeInput(message);
    const safePhone = sanitizeInput(phone || '');

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_RECEIVER || 'jatinkavani877@gmail.com',
      replyTo: safeEmail,
      subject: `${safeSubject ? safeSubject + ' - ' : ''}Contact Form - ${safeName}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>
        ${safeSubject ? `<p><strong>Subject:</strong> ${safeSubject}</p>` : ''}
        <hr />
        <p>${safeMessage}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (err) {
    console.error('Email send error', err && err.message ? err.message : err);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
};
