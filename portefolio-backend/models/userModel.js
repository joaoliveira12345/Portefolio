const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@local',
    password: '$2b$10$A6GZMuvd9qynXVZrphSjjesBaN6zsQt0zWZ6TSgXP77Ka1MS1XNeS', // Replace with hash from Step 2
    role: 'admin'
  },
  {
    id: 2,
    name: 'Visitor User',
    email: 'visitor@local',
    password: '$2b$10$JHqFamMxfZaQivs8nbnkV.t2oiO22vC9a96CZQ6.YsVoUPcLK.Bje', // Replace with hash from Step 2
    role: 'visitor'
  }
];

// Function to seed admin
const seedAdmin = () => {
  console.log('✅ Users initialized:');
  console.log('   Admin: admin@local / admin123');
  console.log('   Visitor: visitor@local / visitor123');
};

module.exports = { users, seedAdmin };