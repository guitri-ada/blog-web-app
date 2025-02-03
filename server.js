require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const app = express();

const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(ATLAS_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Middleware
app.use(express.json());

let db;

// Connect to MongoDB Atlas
async function connectToDatabase() {
    const client = new MongoClient(ATLAS_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        db = client.db('blog_app');
        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error(error);
    }
}

connectToDatabase().catch(console.dir);

// Routes
const blogPostRoutes = require('./routes/blogPostRoute');
app.use('/api/blogposts', blogPostRoutes);

// > User
const userProfilesRoute = require('./routes/userProfilesRoute');
const authRoute = require('./routes/authRoute');
app.use('/api/auth', authRoute);

app.use('/api/userProfiles', userProfilesRoute);

// Root route for status check
app.get('/', (req, res) => {
  res.send('Server is running, and MongoDB is connected!');
});

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});