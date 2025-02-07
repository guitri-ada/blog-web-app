import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, TextField } from "@mui/material";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch CSRF token
  const getCsrfToken = async () => {
    try {
      const response = await axios.get("/api/csrf-token", { withCredentials: true });
      return response.data.csrfToken;
    } catch (err) {
      console.error("Failed to fetch CSRF token:", err);
      return null;
    }
  };

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/blogposts", { withCredentials: true });
      setPosts(response.data);
      setLoading(false);
    } catch {
      setError("Failed to fetch blog posts.");
      setLoading(false);
    }
  };

  // Delete a blog post
  const deletePost = async (id) => {
    try {
      const csrfToken = await getCsrfToken();
      if (!csrfToken) throw new Error("CSRF token not available");

      await axios.delete(`/api/blogposts/${id}`, {
        headers: { "X-CSRF-Token": csrfToken },
        withCredentials: true,
      });

      setPosts(posts.filter((post) => post._id !== id));
      alert("Blog post deleted successfully!");
    } catch (err) {
      console.error("Failed to delete blog post:", err);
      alert("Failed to delete blog post.");
    }
  };

  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditData({ title: post.title, content: post.content });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Edit a blog post
  const handleEditSubmit = async () => {
    if (!editingPostId) return;
    try {
      const csrfToken = await getCsrfToken();
      if (!csrfToken) throw new Error("CSRF token not available");

      const response = await axios.put(
        `/api/blogposts/${editingPostId}`,
        editData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );

      setPosts(posts.map((post) => (post._id === editingPostId ? response.data : post)));
      setEditingPostId(null);
      alert("Blog post updated successfully!");
    } catch (err) {
      console.error("Failed to edit blog post:", err);
      alert("Failed to update blog post.");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={4} maxWidth="800px" margin="0 auto">
      <Box mb={4} textAlign="center">
        <Link to="/newblogpost" style={{ textDecoration: "none", color: "#007bff", fontSize: "18px" }}>
          Create a New Blog Post
        </Link>
      </Box>

      {posts.length > 0 ? (
        posts.map((post) => {
          const date = new Date(post.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          return (
            <Box key={post._id} mb={6} borderBottom="1px solid #ddd" pb={4}>
              {editingPostId === post._id ? (
                <Box>
                  <TextField
                    name="title"
                    label="Title"
                    value={editData.title}
                    onChange={handleEditChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="content"
                    label="Content"
                    value={editData.content}
                    onChange={handleEditChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                  />
                  <Button onClick={handleEditSubmit} variant="contained" color="primary">
                    Save
                  </Button>
                  <Button onClick={() => setEditingPostId(null)} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h4" fontWeight="bold" mb={1} color="#333">
                    {post.title}
                  </Typography>
                  <Typography variant="body1" textAlign="left" lineHeight={1.8} color="#555">
                    {post.content}
                  </Typography>
                  <Typography variant="body2" textAlign="right" color="black">
                    By {post.author}, on {date}
                  </Typography>
                  <Box mt={2}>
                    <Button onClick={() => startEditing(post)} variant="outlined" color="primary" sx={{ mr: 2 }}>
                      Edit
                    </Button>
                    <Button onClick={() => deletePost(post._id)} variant="contained" color="error">
                      Delete
                    </Button>
                  </Box>
                </Box>
              )}
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
