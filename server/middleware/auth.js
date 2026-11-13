const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'diyas_dental_secret_jwt_key_9years_care';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function authenticateAdmin(req, res, next) {
  // Allow simple direct header for easy testing/demo
  const directPassword = req.headers['x-admin-password'];
  if (directPassword && directPassword === ADMIN_PASSWORD) {
    req.admin = { username: 'admin', role: 'admin' };
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication token missing.',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired session token. Please log in again.',
    });
  }
}

module.exports = {
  authenticateAdmin,
  JWT_SECRET,
};
