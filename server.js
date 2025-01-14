require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI;

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

// > Blog post
const blogPostRoutes = require('./routes/blogPostRoute');
app.use('/api/blogPosts', blogPostRoutes);

// > User
const userProfilesRoute = require('./routes/userProfilesRoute');
app.use('/api/userProfiles', (req, res, next) => {
    req.db = db;
    next();
}, userProfilesRoute);

// > etc...

// Root route for status check
app.get('/', (req, res) => {
    res.send('Server is running, and MongoDB is connected!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});