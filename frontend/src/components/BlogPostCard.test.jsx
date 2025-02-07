import { render } from '@testing-library/react';
import BlogPostCard from './BlogPostCard';

// Mock the global alert function before each test
beforeEach(() => {
  // Jest spyOn is used to mock the alert function so it doesn't show popups during tests
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

// Restore the original alert function after each test
afterEach(() => {
  // This ensures that the global alert function is reset to its original implementation after each test
  window.alert.mockRestore();
});

// Test to ensure the BlogPostCard renders without crashing
test('renders BlogPostCard without crashing', () => {
  // Sample data for a blog post object that will be passed as props to the component
  const post = {
    title: 'Sample Title',
    content: 'Sample content for the blog post.',
    createdAt: '2025-02-06T10:49:00Z'
  };

  // Render the BlogPostCard component with the sample post data
  render(<BlogPostCard post={post} />);
});
