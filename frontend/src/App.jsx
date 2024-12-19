import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogPosts from './pages/BlogPosts'; // Updated import
import NewBlogPost from './pages/NewBlogPost';
import { Box, Button } from '@mui/material';

function App() {
    return (
        <Router>
            <Box p={2}>
                {/* Navigation */}
                <Box mb={4} textAlign="center">
                    <Button component={Link} to="/" variant="outlined" sx={{ mx: 2 }}>
                        Blog Posts
                    </Button>
                    <Button component={Link} to="/new" variant="outlined" sx={{ mx: 2 }}>
                        Create New Blog
                    </Button>
                </Box>

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<BlogPosts />} /> {/* Updated Route */}
                    <Route path="/new" element={<NewBlogPost />} />
                </Routes>
            </Box>
        </Router>
    );
}

export default App;
