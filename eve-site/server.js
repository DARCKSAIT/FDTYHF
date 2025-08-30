const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory store of payment codes
const payments = new Map();

// Generates a unique payment code that players must include in their transfer
app.post('/payment-code', (req, res) => {
  const code = uuidv4();
  payments.set(code, { verified: false, createdAt: Date.now() });
  res.json({ code });
});

// Basic site pages
app.get('/', (req, res) => res.render('home'));
app.get('/testimonials', (req, res) => res.render('testimonials'));
app.get('/economy', (req, res) => res.render('economy'));
app.get('/battles', (req, res) => res.render('battles'));
app.get('/alliances', (req, res) => res.render('alliances'));
app.get('/subscribe', (req, res) => res.render('subscribe'));

// Verifies if a code has been paid in-game.
// This is a simplified placeholder: a real implementation would query the
// EVE Online ESI API for wallet transactions or contracts.
app.get('/verify/:code', async (req, res) => {
  const code = req.params.code;
  const record = payments.get(code);
  if (!record) {
    return res.status(404).json({ error: 'Unknown code' });
  }

  // Placeholder verification logic
  record.verified = true;
  res.json({ code, verified: record.verified });
});

module.exports = { app, payments };

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
