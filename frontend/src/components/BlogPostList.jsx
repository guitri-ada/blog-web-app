import React from 'react';
import { Grid, Typography } from '@mui/material';
import BlogPostCard from './BlogPostCard';

const BlogPostList = ({ posts }) => {
    if (!posts.length) {
        return <Typography>No blog posts available.</Typography>;
    }

    return (
        <Grid container spacing={4}>
            {posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                    <BlogPostCard post={post} />
                </Grid>
            ))}
        </Grid>
    );
};

export default BlogPostList;
