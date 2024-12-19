import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid } from '@mui/material';
import BlogPostCard from '../components/BlogPostCard';

const BlogPosts = () => {
    const [posts, setPosts] = useState([]);

    // Fetch blog posts from the backend
    useEffect(() => {
        axios.get('/api/blogposts')
            .then((response) => setPosts(response.data))
            .catch((error) => console.error('Error fetching blog posts:', error));
    }, []);

    return (
        <Box p={4}>
            <Typography variant="h4" mb={4} textAlign="center">
                Blog Posts
            </Typography>
            <Grid container spacing={4}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post._id}>
                            <BlogPostCard post={post} />
                        </Grid>
                    ))
                ) : (
                    <Typography>No blog posts available.</Typography>
                )}
            </Grid>
        </Box>
    );
};

export default BlogPosts;
