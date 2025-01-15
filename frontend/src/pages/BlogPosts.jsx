import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

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
    <Box p={4} maxWidth="800px" margin="0 auto">
      {/* Link to create a new blog post */}
      <Box mb={4} textAlign="center">
        <Link to="/newblogpost" style={{ textDecoration: 'none', color: '#007bff', fontSize: '18px' }}>
          Create a New Blog Post
        </Link>
      </Box>
  
      {/* Blog Posts List */}
      {posts.length > 0 ? (
        posts.map((post) => {
          const date = new Date(post.createdAt);
          const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
  
          return (
            <Box key={post._id} mb={6} borderBottom="1px solid #ddd" pb={4}>
              <Typography variant="h4" fontWeight="bold" mb={1} color="#333">
                {post.title}
              </Typography>
              <Typography variant="body1" textAlign='left' lineHeight={1.8} color="#555">
                {post.content}
              </Typography>
              <Typography variant="body1" textAlign='right' lineHeight={1.8} color="black">
                By {post.author}, on {formattedDate}
              </Typography>
            </Box>
          );
        })
      ) : (
        <Typography>No blog posts available.</Typography>
      )}
    </Box>
  );
  
};

export default BlogPosts;
