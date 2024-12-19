import React from 'react';
import { Box, Typography } from '@mui/material';

const BlogPostCard = ({ post }) => {
    return (
        <Box mb={3} p={2} border={1} borderColor="grey.300">
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body1">{post.content}</Typography>
        </Box>
    );
};

export default BlogPostCard;
