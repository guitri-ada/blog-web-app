import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import DOMPurify from 'dompurify';

const BlogPostForm = ({ onCreate }) => {
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleSubmit = () => {
    if (!newPost.title || !newPost.content) {
      alert('Both title and content are required.');
      return;
    }

    const sanitizedData = {
      title: DOMPurify.sanitize(newPost.title.trim()),
      content: DOMPurify.sanitize(newPost.content.trim())
    };

    onCreate(sanitizedData);
    setNewPost({ title: '', content: '' });
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2}>
        Create a New Blog Post
      </Typography>
      <TextField
        label="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create Post
      </Button>
    </Box>
  );
};

export default BlogPostForm;