import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalenderClass from "./Calendar.module.css";

const Dashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [activeSlot, setActiveSlot] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // This fetches the list of doctors when the component loads
    axios
      .get("/api/doctors") // Using relative path for proxy
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setError("Could not load doctor information.");
      });
  }, []);

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
    setSelectedIssue("");
  };

  const handleIssueChange = (event) => {
    setSelectedIssue(event.target.value);
  };

  const handleDateChange = (event) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    if (event < currentDate) {
      alert("Please select a date in the future.");
      return;
    }
    if (!selectedDoctor) {
      alert("Please select a doctor first.");
    } else if (!selectedIssue) {
      alert("Please select an issue first.");
    }
    setSelectedDate(event);
    setSelectedTimeSlot("");
    setActiveSlot("");
  };

  const handleTimeSlotSelection = (event) => {
    setSelectedTimeSlot(event);
    setActiveSlot(event);
  };

  // --- THIS IS THE FUNCTION WITH THE FIX ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    // 1. Get the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        setError("Authentication error. Please log out and log back in.");
        return;
    }

    // 2. Create the authorization header
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // 3. Create the data payload
    const appointmentData = {
        patientId: user._id,
        patientName: user.name,
        doctorId: selectedDoctor,
        issue: selectedIssue,
        dayName: selectedDate,
        time: selectedTimeSlot,
    };

    try {
        // 4. Send the data AND the config with the token
        const response = await axios.post("/api/appointments", appointmentData, config);
        setSuccess("Appointment booked successfully!");
        console.log("Appointment booked!", response.data);
    } catch (error) {
        console.error("Booking error:", error);
        // Display the specific error from the server if it exists
        const message = error.response?.data?.error || "An unexpected error occurred.";
        setError(message);
    }
  };

  const getDoctorById = (doctorId) => {
    return doctors.find((doctor) => doctor._id === doctorId);
  };

  const getAvailableTimeSlots = () => {
    const doctor = getDoctorById(selectedDoctor);
    if (doctor && selectedIssue && selectedDate) {
      const selectDate = new Date(selectedDate);
      const dayName = selectDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const selectedIssueObj = doctor.availableSlots.find(
        (slot) => slot.day === dayName
      );
      if (selectedIssueObj) {
        return selectedIssueObj.timeSlots.map((timeSlot) => timeSlot);
      }
    }
    return [];
  };

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.name}!</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        {/* ... your form fields for doctor, issue, etc. ... */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="doctorSelect" className="form-label">
              Doctor:
            </label>
            <select
              id="doctorSelect"
              className="form-select"
              value={selectedDoctor}
              onChange={handleDoctorChange}
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="issueSelect" className="form-label">
              Issue:
            </label>
            <select
              id="issueSelect"
              className="form-select"
              value={selectedIssue}
              onChange={handleIssueChange}
              disabled={!selectedDoctor}
            >
              <option value="">Select an issue</option>
              {getDoctorById(selectedDoctor)?.expertIssues.map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="dateInput" className="form-label">
              Date:
            </label>
            <div className={CalenderClass.align}>
              <Calendar
                id="dateInput"
                className={CalenderClass.Calendar}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="col-md-8 mb-3">
            <label className="form-label">Available Time Slots:</label>
            <p className="form-text text-muted">
              {(!selectedDoctor || !selectedIssue || !selectedDate) && "Please select a doctor, issue, and date to see slots."}
            </p>
            <div className="list-group">
              {getAvailableTimeSlots().map((timeSlot) => (
                <button
                  type="button"
                  className={`list-group-item list-group-item-action ${activeSlot === timeSlot.slots ? "active" : ""}`}
                  onClick={() => handleTimeSlotSelection(timeSlot.slots)}
                  key={timeSlot._id}
                  disabled={timeSlot.selected}
                >
                  {timeSlot.slots} {timeSlot.selected && "(Booked)"}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Display Success or Error Messages */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            !selectedDoctor || !selectedIssue || !selectedDate || !selectedTimeSlot
          }
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Dashboard;

