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
        } catch (err) {
            setError('Failed to create blog post.');
        }
    };

    return { posts, loading, error, createPost };
};

export default useBlogPosts;
