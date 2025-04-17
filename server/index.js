require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const doctorsRouter = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");
const appontmentRoutes = require("./routes/appointmentRoutes");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
// Register routes
app.get("/", function (req, res) {
  res.send("landing page add /doctor to get all doctors");
});
app.use("/api/users", userRoutes);
app.use("/appointments", appontmentRoutes);
app.use("/doctors", doctorsRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
