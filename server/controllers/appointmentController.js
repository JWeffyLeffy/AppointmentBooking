const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// This function creates a new appointment
const createAppointment = async (req, res) => {
    try {
        const { patientName, patientId, doctorId, issue, dayName, time } = req.body;
        const selectDate = new Date(dayName);
        const date = selectDate.toLocaleDateString("en-US", { weekday: "long" });

        const doctorData = await Doctor.findById(doctorId);
        if (!doctorData) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        const doctorName = doctorData.name;
        // const doctorEmail = doctorData.email; // Email functionality disabled

        const userData = await User.findById(patientId);
        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }
        // const userEmail = userData.email; // Email functionality disabled

        const existingAppointment = await Appointment.findOne({ doctorId, date, time });
        if (existingAppointment) {
            return res.status(400).json({ error: "Appointment already booked for this slot" });
        }

        const appointment = new Appointment({ patientName, patientId, doctorId, doctorName, issue, date, time });
        const savedAppointment = await appointment.save();

        await Doctor.findOneAndUpdate(
            { _id: doctorId, "availableSlots.day": date },
            { $set: { "availableSlots.$.timeSlots.$[elem].selected": true } },
            { arrayFilters: [{ "elem.slots": time }], new: true }
        );

        /*
        // --- EMAIL FUNCTIONALITY DISABLED ---
        // The following code is commented out to prevent the server from crashing
        // because "App Passwords" are not available in your Google Account.

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });

        const userMailOptions = { 
            from: "Appointment Booking System", 
            to: userEmail, 
            subject: "Appointment Confirmation", 
            text: `Dear ${patientName}, your appointment with Dr. ${doctorName} on ${date} at ${time} has been successfully booked.` 
        };

        const doctorMailOptions = { 
            from: "Appointment Booking System", 
            to: doctorEmail, 
            subject: "New Appointment", 
            text: `Dear Dr. ${doctorName}, you have a new appointment with ${patientName} on ${date} at ${time}.` 
        };
        
        transporter.sendMail(userMailOptions);
        transporter.sendMail(doctorMailOptions);
        */

        // Send a success response
        res.status(201).json({ message: "Appointment booked successfully (email disabled)", appointment: savedAppointment });

    } catch (error) {
        console.error("ERROR CREATING APPOINTMENT:", error);
        res.status(500).json({ error: "Server error while creating appointment." });
    }
};

// This function gets appointments for the logged-in user
const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user.id });
        if (!appointments) {
            return res.status(404).json({ error: "No appointments found" });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.error("ERROR FETCHING APPOINTMENTS:", error);
        res.status(500).json({ error: "Server error while fetching appointments." });
    }
};

// Ensure both functions are exported correctly
module.exports = {
    createAppointment,
    getMyAppointments,
};

