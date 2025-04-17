const express = require("express");
const { createAppointment } = require("../controllers/appointmentController");

const router = express.Router();

// POST request to add an appointment
router.post("/", createAppointment);

module.exports = router;
