const express = require('express');
const router = express.Router();

// 1. Import the controller functions that contain all the logic
const { 
  registerUser, 
  loginUser, 
  getMe 
} = require('../controllers/userController');

// 2. Import the authentication middleware to protect routes
const { protect } = require('../middleware/authMiddleware');

// 3. Define the URL paths and connect them to the controller functions
router.post('/register', registerUser);
router.post('/login', loginUser);

// This route is protected. The 'protect' middleware will run first.
// If the token is valid, it will then call the 'getMe' function.
router.get('/me', protect, getMe);

module.exports = router;

