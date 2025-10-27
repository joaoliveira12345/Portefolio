const express = require('express');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/projects.json');

/**
 * GET /projects
 * Get all projects (public)
 */
router.get('/', (req, res) => {
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const projects = JSON.parse(raw || '[]');
    res.json({ 
      success: true,
      count: projects.length,
      projects 
    });
  } catch (error) {
    console.error('Error reading projects:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error loading projects.' 
    });
  }
});

/**
 * POST /projects
 * Add new project (admin only)
 */
router.post('/', auth, requireRole('admin'), (req, res) => {
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const projects = JSON.parse(raw || '[]');
    
    const project = req.body;
    
    // Generate ID
    project.id = projects.length > 0 
      ? Math.max(...projects.map(p => p.id || 0)) + 1 
      : 1;
    
    // Add timestamp
    project.createdAt = new Date().toISOString();
    project.createdBy = req.user.name;
    
    projects.push(project);
    fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
    
    res.status(201).json({ 
      success: true,
      message: 'Project created successfully.',
      project 
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating project.' 
    });
  }
});

/**
 * GET /projects/dashboard
 * Protected dashboard route
 */
router.get('/dashboard', auth, (req, res) => {
  res.json({ 
    success: true,
    message: `Welcome to your dashboard, ${req.user.name}!`,
    user: {
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

module.exports = router;