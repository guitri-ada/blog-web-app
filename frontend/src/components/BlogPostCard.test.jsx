import { render, test } from '@testing-library/react';
import BlogPostCard from './BlogPostCard';

test('renders BlogPostCard without crashing', () => {
    const post = {
        title: 'Sample Title',
        content: 'Sample content for the blog post.',
        createdAt: '2025-02-06T10:49:00Z'
    };

    render(<BlogPostCard post={post} />);
});