const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'dev_secret_change_in_production';
const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Sign a JWT token
 */
function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * Verify a JWT token
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return null;
  }
}

module.exports = { signToken, verifyToken };