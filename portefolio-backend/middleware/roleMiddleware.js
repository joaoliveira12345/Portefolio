/**
 * Middleware to check user role
 */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized. Please login.' 
      });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ 
        success: false,
        message: `Forbidden. ${role} access required.` 
      });
    }
    
    next();
  };
}

module.exports = { requireRole };