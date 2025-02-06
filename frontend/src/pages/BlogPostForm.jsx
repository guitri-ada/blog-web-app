import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

const BlogPostForm = () => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleSubmit = () => {
    if (!newPost.title || !newPost.content) {
      alert("Both title and content are required.");
      return;
    }

    axios
      .post("/api/blogposts", newPost)
      .then(() => {
        setNewPost({ title: "", content: "" });
        alert("Blog post created successfully!");
      })
      .catch((error) => console.error("Error creating blog post:", error));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4} textAlign="center">
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
