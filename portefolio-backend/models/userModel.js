const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@local',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Visitor User',
    email: 'visitor@local',
    password: 'visitor123',
    role: 'visitor'
  }
];

// Function to seed admin (optional, for compatibility)
const seedAdmin = () => {
  console.log('✅ Users initialized:');
  console.log('   Admin: admin@local / admin123');
  console.log('   Visitor: visitor@local / visitor123');
};

module.exports = { users, seedAdmin };