import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalenderClass from "./Calendar.module.css";

const Dashboard = ({ user, handleLogout }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [activeSlot, setActiveSlot] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // **FIXED**: Changed URL to match the server's route: /api/doctors
    axios
      .get("/api/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        // Log the actual error for easier debugging
        console.error("Error fetching doctors:", error);
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
    currentDate.setHours(0, 0, 0, 0); // Set to the beginning of the day for accurate comparison
    if (event < currentDate) {
      alert("Please select a date from today onwards.");
      return;
    }
    if (!selectedDoctor) {
      alert("Please select the doctor first.");
    } else if (!selectedIssue) {
      alert("Please select the issue.");
    }
    setSelectedDate(event);
    setSelectedTimeSlot("");
  };

  const handleTimeSlotSelection = (event) => {
    setSelectedTimeSlot(event);
    setActiveSlot(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // **FIXED**: Changed URL to match the server's route: /api/appointments
    axios
      .post("/api/appointments", {
        patientId: user._id,
        patientName: user.name,
        doctorId: selectedDoctor,
        issue: selectedIssue,
        dayName: selectedDate, // The server expects the full date object
        time: selectedTimeSlot,
      })
      .then((response) => {
        console.log("Appointment booked!", response.data);
        alert("Appointment booked successfully!");
        // Optional: you might want to refresh the slots or clear the form
        setSelectedDate("");
        setSelectedTimeSlot("");
        setActiveSlot("");
        setError("");
      })
      .catch((error) => {
        console.error("Booking error:", error);
        setError(error.response?.data?.error || "An unknown error occurred.");
      });
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
      const selectedDaySlots = doctor.availableSlots.find(
        (slot) => slot.day === dayName
      );
      if (selectedDaySlots) {
        return selectedDaySlots.timeSlots;
      }
    }
    return [];
  };

  const doctorData = getDoctorById(selectedDoctor);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.name}!</h2>
      <button onClick={handleLogout} className="btn btn-danger float-end">Logout</button>
      <form className="mt-4" onSubmit={handleSubmit}>
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
              required
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
              required
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
                minDate={new Date()} // Prevents selecting past dates
              />
            </div>
          </div>

          <div className="col-md-8 mb-3">
            <label className="form-label">Time Slot:</label>
            <ul className="list-group">
              {getAvailableTimeSlots().length > 0 ? (
                getAvailableTimeSlots().map((timeSlot, index) => (
                  <li
                    className={`list-group-item ${
                      timeSlot.slots === activeSlot ? "active" : ""
                    }`}
                    onClick={() => handleTimeSlotSelection(timeSlot.slots)}
                    key={index} // Using index as key is okay here
                    style={{ cursor: 'pointer' }}
                  >
                    {timeSlot.slots}
                  </li>
                ))
              ) : (
                <li className="list-group-item">
                  {selectedDoctor && selectedDate ? "No slots available for this day." : "Select a doctor and date to see slots."}
                </li>
              )}
            </ul>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            !selectedDoctor ||
            !selectedIssue ||
            !selectedDate ||
            !selectedTimeSlot
          }
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Dashboard;

