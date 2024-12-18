const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample blog posts array (temporary until we connect MongoDB)
let blogPosts = [
    { id: 1, title: 'First Post', content: 'This is the first post!' },
    { id: 2, title: 'Second Post', content: 'This is the second post!' },
];

// Routes
app.get('/api/posts', (req, res) => {
    res.json(blogPosts);
});

app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: blogPosts.length + 1, title, content };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
