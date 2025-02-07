import { render } from '@testing-library/react';
import BlogPostCard from './BlogPostCard';

// Mock the global alert function
beforeEach(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  // Restore the original alert function after each test
  window.alert.mockRestore();
});

test('renders BlogPostCard without crashing', () => {
  const post = {
    title: 'Sample Title',
    content: 'Sample content for the blog post.',
    createdAt: '2025-02-06T10:49:00Z'
  };

  render(<BlogPostCard post={post} />);
});
