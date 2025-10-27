const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authController = require('./controllers/authController');
const projectController = require('./controllers/projectController');
const { seedAdmin } = require('./models/userModel');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure data directory and projects.json exist
const backendDataDir = path.join(__dirname, 'data');
const backendDataPath = path.join(backendDataDir, 'projects.json');

if (!fs.existsSync(backendDataDir)) {
  fs.mkdirSync(backendDataDir);
}

if (!fs.existsSync(backendDataPath)) {
  const frontendData = path.resolve(__dirname, '../src/data/portfolio.json');
  if (fs.existsSync(frontendData)) {
    console.log('Copying projects from frontend...');
    fs.copyFileSync(frontendData, backendDataPath);
  } else {
    console.log('Creating empty projects.json...');
    fs.writeFileSync(backendDataPath, JSON.stringify([], null, 2));
  }
}

// Seed admin user
seedAdmin();

// Routes
app.use('/auth', authController);
app.use('/projects', projectController);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'Portfolio Backend API Running',
    endpoints: {
      auth: ['/auth/register', '/auth/login'],
      projects: ['/projects (GET)', '/projects (POST - admin only)'],
      dashboard: ['/projects/dashboard (protected)']
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 Default admin: admin@local / admin123`);
});