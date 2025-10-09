const express = require('express');
const router = express.Router();
const { createAppointment, getMyAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware'); // Import the middleware

// POST /api/appointments (This route should also be protected)
router.post('/', protect, createAppointment);

// GET /api/appointments/my-appointments
router.get('/my-appointments', protect, getMyAppointments); // Add this new route

module.exports = router;
