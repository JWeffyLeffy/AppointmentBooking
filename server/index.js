require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const doctorsRouter = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// --- Routes ---
app.get("/", function (req, res) {
  res.send("API landing page. Use specific routes to get data.");
});

// Use more specific API routes for clarity
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorsRouter);

// --- Connect to MongoDB ---
// **FIXED**: Changed process.env.MONGODB_URL to process.env.MONGO_URI
// **UPDATED**: Removed deprecated Mongoose options
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // --- Start the server only after a successful DB connection ---
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
