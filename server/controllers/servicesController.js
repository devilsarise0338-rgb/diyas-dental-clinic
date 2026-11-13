const { getDb } = require('../db/connection');

function getServices(req, res) {
  try {
    const db = getDb();
    const services = db.queryAll('SELECT * FROM services ORDER BY id ASC');
    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve services.',
    });
  }
}

module.exports = {
  getServices,
};
