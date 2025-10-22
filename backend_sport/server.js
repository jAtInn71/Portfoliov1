require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Safely load the contact route
let contactRoute;
try {
  contactRoute = require('./api/contact');
  console.log('Successfully loaded contact API module');
} catch (error) {
  console.error('Failed to load contact API module:', error.message);
  // Fallback handler
  contactRoute = (req, res) => {
    res.status(503).json({ 
      success: false, 
      error: 'Contact API is not available in this environment' 
    });
  };
}

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
  res.json({ 
    message: 'Sport Portfolio Backend API', 
    status: 'online',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Use the contact API route
app.use('/api/contact', (req, res) => {
  return contactRoute(req, res);
});

// Start server
app.listen(PORT, () => {
  // Determine if running on render (production) or locally
  const isProduction = process.env.NODE_ENV === 'production';
  const serverUrl = isProduction 
    ? `https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'your-render-url'}`
    : `http://localhost:${PORT}`;
    
  console.log(`🚀 Server running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  console.log(`👉 Check if server is running: ${serverUrl}`);
  console.log(`👉 Test contact API: ${serverUrl}/api/contact`);
});
