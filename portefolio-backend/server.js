require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { seedAdmin } = require('./models/userModel');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./controllers/authController');
const projectRoutes = require('./controllers/projectController');

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Portfolio Backend API Running',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /auth/login',
        me: 'GET /auth/me'
      },
      projects: {
        getAll: 'GET /projects',
        create: 'POST /projects (admin only)',
        delete: 'DELETE /projects/:id (admin only)',
        dashboard: 'GET /projects/dashboard (protected)'
      }
    },
    credentials: {
      admin: {
        email: 'admin@local',
        password: 'admin123',
        role: 'admin'
      },
      visitor: {
        email: 'visitor@local',
        password: 'visitor123',
        role: 'visitor'
      }
    }
  });
});

// Initialize users
seedAdmin();

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 Admin: admin@local / admin123`);
  console.log(`👁️  Visitor: visitor@local / visitor123`);
});