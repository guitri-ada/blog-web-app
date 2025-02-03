import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const BlogPostCard = ({ post }) => {
    return (
        <Card sx={{ marginBottom: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.content}
                </Typography>
                <Box mt={2} textAlign="right">
                    <Typography variant="caption" color="text.secondary">
                        Posted on: {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BlogPostCard;
