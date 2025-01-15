require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose

const app = express();
const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI; // Connection string for MongoDB Atlas

// Middleware
app.use(express.json());

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(ATLAS_URI)
    .then(() => {
        console.log("Connected to MongoDB Atlas!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB Atlas", error);
    });

// Routes
const blogPostRoutes = require('./routes/blogPostRoute');
app.use('/api/blogposts', blogPostRoutes);

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
