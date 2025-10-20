# MERN Stack Appointment Booking System

A full-stack web application for booking doctor appointments, built with MongoDB, Express.js, React, and Node.js. This system allows users to register, log in, and manage their appointments seamlessly, with email notifications for confirmations.

## ✨ Features

-   **User Authentication:** Secure user registration and login functionality.
-   **Appointment Management:** Users can easily book, view, reschedule, and cancel appointments.
-   **Email Notifications:** Automatic email confirmations for appointment bookings using Nodemailer.
-   **Admin Dashboard:** A dedicated interface for administrators to manage all user appointments.
-   **Responsive Design:** A clean and intuitive user interface that works on both desktop and mobile devices.

## 🛠️ Tech Stack

-   **Frontend:** React, HTML, CSS
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **Email Service:** Nodemailer

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

-   [Node.js](https://nodejs.org/en/) (v14 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)<YOUR_GITHUB_USERNAME>/AppointmentBooking.git
    cd AppointmentBooking
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### Environment Variables

The backend requires a `.env` file with the following variables. Create a file named `.env` in the `backend` directory and add the following:

```ini
# .env file for the backend

# Your MongoDB connection string
MONGO_URL=mongodb://localhost:27017/appointment_booking

# Port for the server to run on
PORT=5000

# Nodemailer configuration for sending emails
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password