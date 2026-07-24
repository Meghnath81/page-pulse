require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const auditRoutes = require('./routes/auditRoutes');

const app = express();

// Security and Performance Middlewares
app.use(helmet({
  contentSecurityPolicy: false // Allows inline scripts for simple frontend setup
}));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Page Pulse API is running smoothly.' });
});

// Modular API Routes
app.use('/api', auditRoutes);

module.exports = { app };

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}