import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import DOMPurify from "dompurify";

const NewBlogPostForm = ({ onPostAdded = () => {} }) => { 
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const getCsrfToken = async () => {
    try {
      const response = await axios.get("/api/csrf-token", { withCredentials: true });
      console.log("CSRF Response:", response); 
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
      content: DOMPurify.sanitize(newPost.content.trim())
    };

    try {
      // Fetch the CSRF token
      const csrfToken = await getCsrfToken();
      if (!csrfToken) {
        throw new Error("CSRF token is missing");
      }

      // Post the sanitized data with the CSRF token included in the headers
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

      // Notify parent component and reset the form
      alert("Blog post created successfully!");
      onPostAdded(response.data);
      setNewPost({ title: "", content: "" });
    } catch (error) {
      console.error("Error adding blog post:", error);
      alert("Error adding blog post. Please try again.");
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Add a New Blog Post
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
        Add Post
      </Button>
    </Box>
  );
};

NewBlogPostForm.propTypes = {
  onPostAdded: PropTypes.func,
};

export default NewBlogPostForm;
