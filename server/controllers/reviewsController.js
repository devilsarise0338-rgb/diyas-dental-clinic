const { getDb } = require('../db/connection');

function getReviews(req, res) {
  try {
    const db = getDb();
    const reviews = db.queryAll('SELECT * FROM reviews ORDER BY id ASC');
    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve reviews.',
    });
  }
}

module.exports = {
  getReviews,
};
