import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to see your appointments.');
          setLoading(false);
          return;
        }

        // Create the authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('/api/appointments/my-appointments', config);
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch appointments. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="container mt-5"><h2>Loading your appointments...</h2></div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <div className="container mt-5">
      <h2>My Appointments</h2>
      {bookings.length === 0 ? (
        <p>You have no appointments booked.</p>
      ) : (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Issue</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>Dr. {booking.doctorName}</td>
                <td>{booking.issue}</td>
                <td>{new Date(booking.dayName).toLocaleDateString()}</td>
                <td>{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
