require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(ATLAS_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit if connection fails
  });

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());

// Routes
const blogPostRoutes = require('./routes/blogPostRoute');
app.use('/api/blogPosts', blogPostRoutes);

const authRoute = require('./routes/authRoute');
app.use('/api/auth', authRoute);

const userProfilesRoute = require('./routes/userProfilesRoute');
app.use('/api/userProfiles', userProfilesRoute);

// Root route for status check
app.get('/', (req, res) => {
  res.send('Server is running, and MongoDB is connected!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
