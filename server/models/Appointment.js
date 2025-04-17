// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctorName: String,
    patientName: String,
    issue: String,
    date: String,
    time: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
