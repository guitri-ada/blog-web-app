/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from '@testing-library/react';
import BlogPostCard from './BlogPostCard';

test('renders BlogPostCard without crashing', () => {
  const post = {
    title: 'Sample Title',
    content: 'Sample content for the blog post.',
    createdAt: '2023-01-01T00:00:00Z',
  };

  render(<BlogPostCard post={post} />);
});