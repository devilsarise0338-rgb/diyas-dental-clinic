const { getDb } = require('../db/connection');

function createAppointment(req, res) {
  try {
    const { patient_name, phone, service_id, preferred_date, preferred_time, message } = req.body;

    // 1. Validate patient name
    if (!patient_name || typeof patient_name !== 'string' || patient_name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid patient name (at least 2 characters).',
      });
    }

    // 2. Validate phone number
    if (!phone || typeof phone !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a contact phone number.',
      });
    }

    const cleanPhone = phone.trim();
    // Allow digits, plus, hyphens, parentheses, and spaces; ensure at least 7 digits
    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (digitsOnly.length < 7 && cleanPhone !== '[Phone]') {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number (at least 7 digits).',
      });
    }

    // 3. Validate preferred date & reject past dates
    if (!preferred_date) {
      return res.status(400).json({
        success: false,
        message: 'Please select a preferred appointment date.',
      });
    }

    const selectedDate = new Date(preferred_date);
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Please use YYYY-MM-DD.',
      });
    }

    // Compare with today's date (at midnight local time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(preferred_date);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Preferred appointment date cannot be in the past.',
      });
    }

    const db = getDb();

    // Verify service exists if service_id is provided
    let verifiedServiceId = null;
    let serviceTitle = 'General Care';
    if (service_id) {
      const srv = db.queryOne('SELECT id, title FROM services WHERE id = ?', [Number(service_id)]);
      if (srv) {
        verifiedServiceId = srv.id;
        serviceTitle = srv.title;
      }
    }

    const timeSlot = preferred_time && preferred_time.trim() ? preferred_time.trim() : '[Timings]';
    const note = message ? message.trim() : '';

    const result = db.run(
      `INSERT INTO appointments (patient_name, phone, service_id, preferred_date, preferred_time, message, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [patient_name.trim(), cleanPhone, verifiedServiceId, preferred_date, timeSlot, note]
    );

    const insertedId = result.lastInsertRowid;
    const newAppointment = db.queryOne(
      `SELECT a.*, s.title as service_title 
       FROM appointments a 
       LEFT JOIN services s ON a.service_id = s.id 
       WHERE a.id = ?`,
      [insertedId]
    );

    res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully.',
      data: newAppointment,
      meta: {
        service_name: serviceTitle,
        follow_up_hint: 'Our clinic reception will confirm your slot shortly.',
      },
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while booking the appointment. Please try again.',
    });
  }
}

module.exports = {
  createAppointment,
};
