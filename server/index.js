// This MUST be the first line to ensure environment variables are loaded
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// --- Import Routers ---
const doctorsRouter = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");
// FIX: Corrected typo from 'appontmentRoutes' to 'appointmentRoutes'
const appointmentRoutes = require("./routes/appointmentRoutes");

// --- Middleware ---
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Simple logger middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// --- API Routes ---
// Best Practice: Use a consistent '/api' prefix for all routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorsRouter);

// --- Connect to MongoDB and Start Server ---
const PORT = process.env.PORT || 5000;

// FIX: Use process.env.MONGO_URI to match your .env file
// FIX: Removed deprecated Mongoose options
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Best Practice: Start the server only after the database connection is successful
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    // Best Practice: Use console.error for better error logging
    console.error("MongoDB Connection Error:", error);
  });

