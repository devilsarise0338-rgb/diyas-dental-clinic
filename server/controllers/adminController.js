const jwt = require('jsonwebtoken');
const { getDb } = require('../db/connection');
const { JWT_SECRET } = require('../middleware/auth');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function adminLogin(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    if (username.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials.',
      });
    }

    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: {
        username: ADMIN_USERNAME,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
    });
  }
}

function getAdminAppointments(req, res) {
  try {
    const db = getDb();
    const { status, date, search } = req.query;

    let query = `
      SELECT a.*, s.title as service_title 
      FROM appointments a 
      LEFT JOIN services s ON a.service_id = s.id 
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'all') {
      query += ' AND a.status = ?';
      params.push(status);
    }

    if (date) {
      query += ' AND a.preferred_date = ?';
      params.push(date);
    }

    if (search) {
      query += ' AND (a.patient_name LIKE ? OR a.phone LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY a.preferred_date ASC, a.id DESC';

    const appointments = db.queryAll(query, params);

    // Compute stats
    const allRows = db.queryAll('SELECT status, preferred_date FROM appointments');
    const todayStr = new Date().toISOString().split('T')[0];

    const stats = {
      total: allRows.length,
      pending: allRows.filter((r) => r.status === 'pending').length,
      confirmed: allRows.filter((r) => r.status === 'confirmed').length,
      cancelled: allRows.filter((r) => r.status === 'cancelled').length,
      today: allRows.filter((r) => r.preferred_date === todayStr).length,
    };

    res.json({
      success: true,
      data: appointments,
      stats,
    });
  } catch (error) {
    console.error('Error fetching admin appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve appointments list.',
    });
  }
}

function updateAppointmentStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['pending', 'confirmed', 'cancelled'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    const db = getDb();
    const existing = db.queryOne('SELECT * FROM appointments WHERE id = ?', [Number(id)]);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    db.run('UPDATE appointments SET status = ? WHERE id = ?', [status, Number(id)]);

    const updated = db.queryOne(
      `SELECT a.*, s.title as service_title 
       FROM appointments a 
       LEFT JOIN services s ON a.service_id = s.id 
       WHERE a.id = ?`,
      [Number(id)]
    );

    res.json({
      success: true,
      message: `Appointment status updated to ${status}.`,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment status.',
    });
  }
}

module.exports = {
  adminLogin,
  getAdminAppointments,
  updateAppointmentStatus,
};
