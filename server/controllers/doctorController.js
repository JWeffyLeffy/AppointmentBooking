// controllers/doctorsController.js
const Doctor = require("../models/Doctor");

// Populate dummy data for doctors
const populateDummyDoctors = async (req, res) => {
  try {
    const dummyDoctors = [
      {
        name: "Javed Ansari",
        email: "javed9876@gmail.com",
        specialization: "Pediatrics",
        expertIssues: ["Childhood vaccinations", "Common cold"],
        availableSlots: [
          {
            day: "Monday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
          {
            day: "Tuesday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
          {
            day: "Wednesday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
          {
            day: "Thursday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
          {
            day: "Friday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
        ],
      },
      {
        name: "Jumma Ansari",
        email: "jumma5432@gmail.com",
        specialization: "Cardiology",
        expertIssues: ["Heart disease", "High blood pressure"],
        availableSlots: [
          {
            day: "Monday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
          {
            day: "Tuesday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
          {
            day: "Wednesday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
          {
            day: "Thursday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
          {
            day: "Friday",
            timeSlots: [
              { selected: false, slots: "09:00 AM" },
              { selected: false, slots: "10:00 AM" },
              { selected: false, slots: "11:00 AM" },
            ],
          },
        ],
      },
    ];
    await Doctor.insertMany(dummyDoctors);
    res.json({ message: "Dummy doctors added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// Get doctor
// GET /doctors/:id
const getAllDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Select a time slot for a doctor
const selectTimeSlot = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const timeSlotId = req.params.timeSlotId;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const timeSlot = doctor.availableSlots.reduce((foundSlot, day) => {
      const slot = day.timeSlots.find(
        (slot) => slot._id.toString() === timeSlotId
      );
      return foundSlot || slot;
    }, null);

    if (!timeSlot) {
            return res.status(404).json({ error: "Time slot not found" });
    }

    timeSlot.selected = true;

    await doctor.save();

    res.json({ message: "Time slot selected successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get doctors with selected time slots
const getDoctorsWithSelectedSlots = async (req, res) => {
  try {
    const doctors = await Doctor.find({
      "availableSlots.timeSlots.selected": true,
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteAllDoctors = async (req, res) => {
  try {
    await Doctor.deleteMany({});
    res.json({ message: "All doctors deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  populateDummyDoctors,
  getAllDoctors,
  selectTimeSlot,
  getDoctorsWithSelectedSlots,
  getAllDoctor,
  deleteAllDoctors,
};
