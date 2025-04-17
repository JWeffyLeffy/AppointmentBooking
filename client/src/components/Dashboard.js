import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalenderClass from "./Calendar.module.css"
const Dashboard = ({ user, handleLogout }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [activeSlot, setActiveSlot] = useState("")
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error(error);
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
    if (event < currentDate) {
      alert("Please select a date after the current date.");
      return;
    }
    if(!selectedDoctor){
      alert("please select the doctor")
    }else if(!selectedIssue){
      alert("please select the issues")
    }
    console.log(event)
    setSelectedDate(event);
    setSelectedTimeSlot("");
  };

  const handleTimeSlotSelection = (event) => {
    setSelectedTimeSlot(event);
    setActiveSlot(event)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/appointments", {
        patientId: user._id,
        patientName: user.name,
        doctorId: selectedDoctor,
        issue: selectedIssue,
        dayName: selectedDate,
        time: selectedTimeSlot,
      })
      .then((response) => {
        console.log("Appointment booked!", response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.error);
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
      const selectedIssueObj = doctor.availableSlots.find(
        (slot) => slot.day === dayName
      );
      if (selectedIssueObj) {
        return selectedIssueObj.timeSlots.map((timeSlot) => timeSlot);
      }
    }
    return [];
  };

  const doctorData = getDoctorById(selectedDoctor);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.name}!</h2>
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
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
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
  <label className="form-label">Time Slot:</label>
  <ul className="list-group">
    {getAvailableTimeSlots().map((timeSlot) => (
      <li
      className={`list-group-item ${timeSlot.selected || timeSlot.slots === activeSlot ? "active" : ""} ${timeSlot.slots.includes("AM") ? "time-slot-am" : "time-slot-pm"}`}
        onClick={() => handleTimeSlotSelection(timeSlot.slots)}
        key={timeSlot._id}
      >
        {timeSlot.slots}
      </li>
    ))}
    {doctorData && !selectedDate && (
      <>
        <h2 className="mt-3">Available Time Slots:</h2>
        {doctorData.availableSlots.map((slot) => (
          <div key={slot.day}>
            <h4 className="mt-3">{slot.day}</h4>
            <div className="row">
              {slot.timeSlots.map((timeSlot, index) => (
                <div className="col-4" key={timeSlot.slots}>
                  <li
                    className={`list-group-item ${
                      timeSlot.selected ? "active" : ""
                    }`}
                    onClick={() => setSelectedTimeSlot(timeSlot.slots)}
                  >
                    {timeSlot.slots}
                  </li>
                  {(index + 1) % 3 === 0 && <div className="w-100"></div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    )}
  </ul>
</div>

        </div>
        {error && <h6>{error}</h6>}
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
