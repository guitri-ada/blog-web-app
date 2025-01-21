require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI;

let db;

// Connect to MongoDB Atlas
async function connectToDatabase() {
  const client = new MongoClient(ATLAS_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    db = client.db('blog_app');
    console.log('Connected to MongoDB Atlas!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
}

connectToDatabase().catch(console.dir);

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
const blogPostRoutes = require('./routes/blogPostRoute');
app.use('/api/blogPosts', (req, res, next) => {
  req.db = db;
  next();
}, blogPostRoutes);

const authRoute = require('./routes/authRoute');
app.use('/api/auth', (req, res, next) => {
  req.db = db;
  next();
}, authRoute);

const userProfilesRoute = require('./routes/userProfilesRoute');
app.use('/api/userProfiles', (req, res, next) => {
  req.db = db;
  next();
}, userProfilesRoute);

// Root route for status check
app.get('/', (req, res) => {
  res.send('Server is running, and MongoDB is connected!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
