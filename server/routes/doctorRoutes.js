// routes/doctors.js
const express = require('express');
const doctorsController = require('../controllers/doctorController');

const router = express.Router();

// Populate dummy data for doctors
router.post('/dummy', doctorsController.populateDummyDoctors);

// GET /doctors
router.get('/', doctorsController.getAllDoctors);

// GET /doctor
router.get('/:id', doctorsController.getAllDoctor);

// PUT /doctors/:id/timeSlots/:timeSlotId/select
router.put('/:id/timeSlots/:timeSlotId/select', doctorsController.selectTimeSlot);

// GET /doctors/selected
router.get('/selected', doctorsController.getDoctorsWithSelectedSlots);

router.delete('/', doctorsController.deleteAllDoctors);
module.exports = router;
