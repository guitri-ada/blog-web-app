import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

const BlogPostForm = () => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);

  // Function to fetch CSRF token from the server
  const getCsrfToken = async () => {
    try {
      const response = await axios.get("/api/csrf-token", { withCredentials: true });
      return response.data.csrfToken;
    } catch (err) {
      console.error("Failed to fetch CSRF token:", err);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!newPost.title || !newPost.content) {
      alert("Both title and content are required.");
      return;
    }

    try {
      const csrfToken = await getCsrfToken();
      if (!csrfToken) {
        throw new Error("CSRF token is missing");
      }

      await axios.post(
        "/api/blogposts",
        newPost,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,  // Adding CSRF token in the header
          },
          withCredentials: true, // Ensure credentials (cookies) are sent
        }
      );

      setNewPost({ title: "", content: "" });
      alert("Blog post created successfully!");
    } catch (error) {
      console.error("Error creating blog post:", error);
      setError("Error creating blog post.");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4} textAlign="center">
        Create a New Blog Post
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
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
