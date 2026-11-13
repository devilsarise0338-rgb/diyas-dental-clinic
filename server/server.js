require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDb } = require('./db/connection');

// Import routes
const doctorsRoutes = require('./routes/doctorsRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
try {
  getDb();
} catch (err) {
  console.error('Fatal: Failed to connect to database:', err);
  process.exit(1);
}

// Middleware
app.use(
  cors({
    origin: '*', // Allows local client on any port during demo/development
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-password'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// API Routes
app.use('/api/doctors', doctorsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    clinic: "Diya's Dental and General Care Clinic",
    service_years: '9+ years',
    location: 'Mansarovar, Jaipur',
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler for API
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found.',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start Server when run directly
if (process.env.VERCEL !== '1' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Diya's Dental & General Care Clinic API Server`);
    console.log(`📍 Listening on: http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Admin demo password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
