import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Grid } from '@mui/material';
import BlogPostCard from '../components/BlogPostCard';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  // Fetch blog posts from the backend
  useEffect(() => {
    axios
      .get('/api/blogposts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching blog posts:', error));
  }, []);

  return (
    <Box p={4}>
      {/* Link to create a new blog post */}
      <Box mb={4} textAlign="center">
        <Link to="/newblogpost" style={{ textDecoration: 'none', color: 'blue', fontSize: '18px' }}>
          Create a New Blog Post
        </Link>
      </Box>

      {/* Page Heading */}
      <Typography variant="h4" mb={4} textAlign="center">
        Blog Posts
      </Typography>

      {/* Blog Posts Grid */}
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
