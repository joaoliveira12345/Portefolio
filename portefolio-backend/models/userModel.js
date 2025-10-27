const bcrypt = require('bcryptjs');

// In-memory user storage (replace with DB in production)
const users = [];

/**
 * Seed a default admin user
 */
async function seedAdmin() {
  if (users.find(u => u.email === 'admin@local')) {
    console.log('Admin user already exists');
    return;
  }
  
  const hash = await bcrypt.hash('admin123', 10);
  users.push({
    id: 1,
    name: 'Admin User',
    email: 'admin@local',
    password: hash,
    role: 'admin'
  });
  console.log('✅ Admin user seeded: admin@local / admin123');
}

/**
 * Find user by email
 */
function findByEmail(email) {
  return users.find(u => u.email === email);
}

/**
 * Add new user
 */
function addUser(user) {
  user.id = users.length + 1;
  users.push(user);
  return user;
}

/**
 * Get all users (for debugging)
 */
function getAllUsers() {
  return users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
}

module.exports = { 
  users, 
  findByEmail, 
  addUser, 
  seedAdmin,
  getAllUsers
};