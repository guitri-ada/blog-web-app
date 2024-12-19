import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import BlogPostCard from '../components/BlogPostCard';
import NewBlogPostForm from '../components/NewBlogPostForm';

const BlogPosts = () => {
    const [posts, setPosts] = useState([]);

    // Fetch blog posts
    useEffect(() => {
        axios.get('http://localhost:5000/api/blogposts')
            .then((response) => setPosts(response.data))
            .catch((error) => console.error('Error fetching blog posts:', error));
    }, []);

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return (
        <Box p={4}>
            <Typography variant="h4" mb={4}>Blog Posts</Typography>

            {/* Display Blog Posts */}
            <Box mb={4}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <BlogPostCard key={post._id} post={post} />
                    ))
                ) : (
                    <Typography>No blog posts available.</Typography>
                )}
            </Box>

            {/* New Blog Post Form */}
            <NewBlogPostForm onPostAdded={addPost} />
        </Box>
    );
};

export default BlogPosts;
