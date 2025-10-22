require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoute = require('./api/contact');

const app = express();
const PORT = process.env.PORT || 5100;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Sport Portfolio Backend API', status: 'online' });
});

// Use the contact API route
app.use('/api/contact', (req, res) => {
  return contactRoute(req, res);
});

// Start server
app.listen(PORT, () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 Check if server is running: ${serverUrl}`);
  console.log(`👉 Test contact API: ${serverUrl}/api/contact`);
});
