import { useState, useEffect } from 'react';
import axios from 'axios';

const useBlogPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch blog posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/blogposts');
                setPosts(response.data);
            } catch (err) {
                setError('Failed to fetch blog posts.');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Create a new blog post
const createPost = async (newPost) => {
    try {
        const response = await axios.post('/api/blogposts', newPost);
        setPosts((prevPosts) => [...prevPosts, response.data]);
        alert('Blog post created successfully!'); 
    } catch (err) {
        alert('Failed to create blog post.');
    }
};

    // Edit a blog post
    const editPost = async (id, updatedData) => {
        try {
            const response = await axios.put(`/api/blogposts/${id}`, updatedData);
            setPosts((prevPosts) => prevPosts.map(post => post._id === id ? response.data : post));
        } catch (err) {
            setError('Failed to update blog post.');
        }
    };

    // Delete a blog post
    const deletePost = async (id) => {
        try {
            await axios.delete(`/api/blogposts/${id}`);
            setPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
        } catch (err) {
            setError('Failed to delete blog post.');
        }
    };

    
    return { posts, loading, error, createPost, editPost, deletePost };
};

export default useBlogPosts;
