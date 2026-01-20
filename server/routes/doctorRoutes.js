const express = require('express');
// **FIXED**: Corrected filename to 'doctorController.js' (singular) as you said.
const doctorsController = require('../controllers/doctorController');

const router = express.Router();

// This route is for adding your sample doctors to the database
router.post('/dummy', doctorsController.populateDummyDoctors);

// This is the main route to get all doctors
router.get('/', doctorsController.getAllDoctors);

// GET a single doctor by their ID
router.get('/:id', doctorsController.getAllDoctor);

// PUT /doctors/:id/timeSlots/:timeSlotId/select
router.put('/:id/timeSlots/:timeSlotId/select', doctorsController.selectTimeSlot);

// GET /doctors/selected
router.get('/selected', doctorsController.getDoctorsWithSelectedSlots);

// DELETE all doctors (useful for testing)
router.delete('/', doctorsController.deleteAllDoctors);

module.exports = router;

