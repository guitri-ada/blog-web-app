import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import DOMPurify from "dompurify";

const NewBlogPostForm = ({ onPostAdded }) => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleSubmit = () => {
    if (!newPost.title || !newPost.content) {
      alert("Both title and content are required.");
      return;
    }

    const sanitizedData = {
      title: DOMPurify.sanitize(newPost.title.trim()),
      content: DOMPurify.sanitize(newPost.content.trim()),
    };

    axios
      .post("/api/blogposts", sanitizedData)
      .then((response) => {
        onPostAdded(response.data); // Notify parent about the new post
        setNewPost({ title: "", content: "" });
      })
      .catch((error) => console.error("Error adding blog post:", error));
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
  onPostAdded: PropTypes.func.isRequired,
};


export default NewBlogPostForm;
