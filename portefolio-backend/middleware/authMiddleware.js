const { verifyToken } = require('../utils/tokenUtils');

/**
 * Middleware to verify JWT token
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false,
      message: 'No token provided. Access denied.' 
    });
  }
  
  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  
  if (!payload) {
    return res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token.' 
    });
  }
  
  // Attach user info to request
  req.user = payload;
  next();
}

module.exports = authMiddleware;