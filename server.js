require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogApp';

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// > Blog post
const blogPostRoutes = require('./routes/blogPostRoute');
app.use('/api/blogPosts', blogPostRoutes);

// > User

// > etc...



// Root route for status check
app.get('/', (req, res) => {
    res.send('Server is running, and MongoDB is connected!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
