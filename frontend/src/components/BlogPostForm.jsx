import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Box, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import axios from "axios";

const BlogPostForm = ({ onCreate }) => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });

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
  
    // Sanitize user input
    const sanitizedData = {
      title: DOMPurify.sanitize(newPost.title.trim()),
      content: DOMPurify.sanitize(newPost.content.trim()),
    };
  
    // Fetch CSRF token before submitting
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      alert("CSRF token is missing.");
      return;
    }
  
    try {
      // Pass sanitized data and CSRF token
      const response = await axios.post(
        "/api/blogposts", 
        sanitizedData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
  
      console.log('Response from server:', response); 
  
      onCreate(response.data); 
      setNewPost({ title: "", content: "" });
      alert("Blog post created successfully!");
    } catch (error) {
      console.error("Error adding blog post:", error);
      alert("Error adding blog post. Please try again.");
    }
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

BlogPostForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default BlogPostForm;
