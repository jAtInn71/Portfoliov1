// Simple test script to POST a contact message to the sport backend
// Usage: node test-send.js

(async () => {
  const url = process.env.URL || 'http://localhost:5100/api/contact';
  const payload = {
    name: 'Test User',
    email: 'tester@example.com',
    subject: 'Test message from script',
    message: 'Hello! This is a test message to verify the sport backend.',
    phone: '+911234567890'
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log('Status:', res.status);
    const body = await res.text();
    console.log('Response body:', body);
  } catch (err) {
    console.error('Request error:', err);
  }
})();
