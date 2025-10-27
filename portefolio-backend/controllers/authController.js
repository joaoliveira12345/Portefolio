const express = require('express');
const bcrypt = require('bcryptjs');
const { signToken } = require('../utils/tokenUtils');
const { findByEmail, addUser } = require('../models/userModel');

const router = express.Router();

/**
 * POST /auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'guest' } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required.' 
      });
    }
    
    // Check if user exists
    if (findByEmail(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered.' 
      });
    }
    
    // Hash password
    const hash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = addUser({ 
      name: name || 'User', 
      email, 
      password: hash, 
      role: role === 'admin' ? 'guest' : role // Prevent self-admin registration
    });
    
    // Generate token
    const token = signToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role, 
      name: user.name 
    });
    
    res.status(201).json({ 
      success: true,
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration.' 
    });
  }
});

/**
 * POST /auth/login
 * Login user
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password.' 
      });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password.' 
      });
    }
    
    // Generate token
    const token = signToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role, 
      name: user.name 
    });
    
    res.json({ 
      success: true,
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login.' 
    });
  }
});

module.exports = router;