# Appointment Booking App 🩺

![Appointment Booking](https://img.shields.io/badge/Version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/License-MIT-green.svg) ![GitHub Releases](https://img.shields.io/badge/Releases-latest-orange.svg)

Welcome to the **Appointment Booking App**! This full-stack MERN application allows users to book doctor appointments seamlessly. With real-time email confirmations, it enhances communication between patients and healthcare providers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Releases](#releases)

## Features

- **User Authentication**: Secure login and registration for patients and doctors.
- **Appointment Management**: Easy scheduling, rescheduling, and cancellation of appointments.
- **Email Notifications**: Real-time email confirmations using Nodemailer and Gmail.
- **Responsive Design**: User-friendly interface for both desktop and mobile devices.
- **Admin Dashboard**: Manage appointments and users efficiently.

## Technologies Used

This project uses the following technologies:

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Email Service**: Nodemailer with Gmail
- **Containerization**: Docker, Docker Compose
- **Deployment**: Heroku (or any other cloud service)

## Getting Started

To get started with the Appointment Booking App, follow these steps:

### Prerequisites

Ensure you have Docker and Docker Compose installed on your machine.

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the repository:

```bash
git clone https://github.com/JWeffyLeffy/AppointmentBooking.git
```

### 2. Navigate to the project directory:

```bash
cd AppointmentBooking
```

### 3. Configure environment variables:

Refer to the [Environment Variables](#environment-variables) section to set up the necessary `.env` files.

### 4. Build and run Docker containers:

From the project root, execute the following command to build images and start services:

```bash
docker-compose up --build
```

This will start the `mongodb`, `server`, and `client` services.

### 5. Access the application:

- The frontend will be available at: `http://localhost:3000`
- The backend API will be available at: `http://localhost:5000`

## Environment Variables

This project uses environment variables to manage sensitive and environment-specific configurations.

### Server (`server/`)

Create `.env` files in the `server/` directory based on the `server/.env.example`.

- **Development (`server/.env.development`)**: Used when `NODE_ENV` is `development`.

```
# .env.development for Server
# Environment variables for development mode

PORT=5000
MONGO_URI=mongodb://localhost:27017/appointmentbooking_dev
JWT_SECRET=your_development_jwt_secret_key
GMAIL=your_development_gmail_address@gmail.com
APP_PASSWORD=your_development_gmail_app_password
EMAIL_SERVICE=gmail
NODE_ENV=development
```

- **Production (`server/.env.production`)**: Used when `NODE_ENV` is `production`.

```
# .env.production for Server
# Environment variables for production mode

PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret_key
GMAIL=your_production_gmail_address@gmail.com
APP_PASSWORD=your_production_gmail_app_password
EMAIL_SERVICE=gmail
NODE_ENV=production
```

### Client (`client/`)

The React client uses environment-specific `.env` files.

- **Development (`client/.env.development`)**: Used when `NODE_ENV` is `development` (e.g., `npm start`).

```
# .env.development for Client
# This file is used for development environment variables.

# API URL for the backend server during development.
# When running the client locally and the server locally or via docker-compose.
REACT_APP_API_URL=http://localhost:5000
```

- **Production (`client/.env.production`)**: Used when `NODE_ENV` is `production` (e.g., `npm run build`).

```
# .env.production for Client
# This file is used for production environment variables.

# API URL for the backend server in production.
# This should be the public URL where your backend API is accessible.
# Example: REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_API_URL=https://your-production-api-url.com
```

## Usage

Once the application is running, you can:

- **Register** as a new user.
- **Log in** to your account.
- **Book an appointment** with your preferred doctor.
- **Receive email confirmations** for your appointments.

### Example Workflow

1. **User Registration**: Fill out the registration form.
2. **Login**: Use your credentials to log in.
3. **Book Appointment**: Select a date and time, then confirm your appointment.
4. **Email Notification**: Receive an email confirmation with appointment details.

## Folder Structure

Here's a quick overview of the folder structure:

```
AppointmentBooking/
├── client/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.development
│   ├── .env.production
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   ├── .env.development
│   ├── .env.production
├── docker-compose.yml
├── .gitignore
├── README.md
```

- **client/**: Contains the client-side code.
- **server/**: Contains the server-side code.
- **docker-compose.yml**: Defines and runs the multi-container Docker application.
- **controllers/**: Business logic for handling requests.
- **middleware/**: Middleware functions for request processing.
- **models/**: Database schemas.
- **routes/**: API routes.

## API Endpoints

The application provides the following API endpoints:

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate a user.
- **GET /api/appointments**: Retrieve all appointments for a user.
- **POST /api/appointments**: Create a new appointment.
- **DELETE /api/appointments/:id**: Cancel an appointment.

## Contributing

We welcome contributions to improve the Appointment Booking App. To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, feel free to reach out:

- **Author**: JWeffyLeffy
- **Email**: [your-email@example.com](mailto:your-email@example.com)

## Releases

You can find the latest releases of the Appointment Booking App [here](https://github.com/JWeffyLeffy/AppointmentBooking/releases). Download the latest version and follow the setup instructions to get started.

---

Thank you for checking out the Appointment Booking App! We hope you find it useful in managing your doctor appointments. If you have any suggestions or issues, please let us know.