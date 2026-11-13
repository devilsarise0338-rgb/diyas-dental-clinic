const { getDb } = require('../db/connection');

function getDoctors(req, res) {
  try {
    const db = getDb();
    const doctors = db.queryAll('SELECT * FROM doctors ORDER BY id ASC');
    res.json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve doctors list.',
    });
  }
}

module.exports = {
  getDoctors,
};
