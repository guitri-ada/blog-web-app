const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const csrf = require('csurf');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const csrfProtection = csrf({ cookie: true });

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register Route
router.post(
  '/register',
  csrfProtection,
  [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create a new user
      const newUser = new User({ username, email, password });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Login Route
router.post(
  '/login',
  csrfProtection,
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Generate token
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.json({ message: 'Login successful!', username: user.username });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);


// Logout Route
router.post('/logout', csrfProtection, (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out successfully!' });
});


// Check authentication route
router.get('/check-auth', csrfProtection, (req, res) => {
  const token = req.cookies.authToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.status(200).json({ authenticated: true, username: decoded.username });
    } catch (err) {
      res.status(401).json({ authenticated: false });
    }
  } else {
    res.status(401).json({ authenticated: false });
  }
});



module.exports = router;
