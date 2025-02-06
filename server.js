require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const app = express();

const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(ATLAS_URI)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());
app.use(csrfProtection);

// Routes
const blogPostRoutes = require('./routes/blogPostRoute');
app.use('/api/blogposts', blogPostRoutes);

const authRoute = require("./routes/authRoute");
app.use("/api/auth", authRoute);

const userProfilesRoute = require("./routes/userProfilesRoute");
app.use("/api/userProfiles", userProfilesRoute);

// Root route for status check
app.get("/", (req, res) => {
  res.send("Server is running, and MongoDB is connected!");
});

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
