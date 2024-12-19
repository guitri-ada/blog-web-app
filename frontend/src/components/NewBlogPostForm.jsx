import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const NewBlogPostForm = ({ onPostAdded }) => {
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const handleSubmit = () => {
        if (!newPost.title || !newPost.content) {
            alert('Both title and content are required.');
            return;
        }

        axios.post('http://localhost:5000/api/blogs', newPost)
            .then((response) => {
                onPostAdded(response.data); // Notify parent about the new post
                setNewPost({ title: '', content: '' });
            })
            .catch((error) => console.error('Error adding blog post:', error));
    };

    return (
        <Box>
            <Typography variant="h5" mb={2}>Add a New Blog Post</Typography>
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
                Add Post
            </Button>
        </Box>
    );
};

export default NewBlogPostForm;
