const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const locationRoutes = require('./routes/locationRoutes');
const narrativeRoutes = require('./routes/narrativeRoutes');
const cultureRoutes = require('./routes/cultureRoutes');
const climateRoutes = require('./routes/climateRoutes');
const indigenousRoutes = require('./routes/indigenousRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/location', locationRoutes);
app.use('/api/narrative', narrativeRoutes);
app.use('/api/culture', cultureRoutes);
app.use('/api/climate', climateRoutes);
app.use('/api/indigenous', indigenousRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
