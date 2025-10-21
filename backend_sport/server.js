// server.js - Sport backend for Contact Form
console.log('🔍 Starting sport backend initialization...');

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ EMAIL_USER or EMAIL_PASS not set. See .env.example');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '').substring(0, 1000);
}

app.post('/api/contact', async (req, res) => {
  // Log the incoming request body for debugging
  console.log('Incoming /api/contact POST body:', JSON.stringify(req.body));
  const { name, email, subject, message, phone } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const safeName = sanitizeInput(name);
  const safeEmail = sanitizeInput(email);
  const safeSubject = sanitizeInput(subject || '');
  const safeMessage = sanitizeInput(message);
  const safePhone = sanitizeInput(phone || '');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'jatinkavani877@gmail.com',
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

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error', err.message);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Debug: echo endpoint to verify POST payloads reach the server
app.post('/api/echo', (req, res) => {
  console.log('Incoming /api/echo POST body:', JSON.stringify(req.body));
  res.json({ success: true, received: req.body });
});

app.get('/api/contact', (req, res) => {
  res.json({ success: true, message: 'Sport backend contact endpoint' });
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`Sport backend running on port ${PORT}`);
  console.log('Server URLs:');
  console.log(`  POST http://localhost:${PORT}/api/contact`);
  console.log(`If you're using a different host or port, update VITE_CONTACT_API_URL in your frontend accordingly.`);
});
