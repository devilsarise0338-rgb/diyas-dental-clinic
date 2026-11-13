const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAdminAppointments,
  updateAppointmentStatus,
} = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

// Public admin login
router.post('/login', adminLogin);

// Protected admin routes
router.get('/appointments', authenticateAdmin, getAdminAppointments);
router.patch('/appointments/:id', authenticateAdmin, updateAppointmentStatus);

module.exports = router;
