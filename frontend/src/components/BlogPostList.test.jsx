import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPostList from './BlogPostList';

// Mock the BlogPostCard component to simplify our tests
jest.mock('./BlogPostCard', () => {
  return function DummyBlogPostCard({ post }) {
    return <div data-testid="blog-post-card">{post._id}</div>;
  };
});

describe('BlogPostList', () => {
  test('renders a message when there are no posts', () => {
    render(<BlogPostList posts={[]} />);
    
    // Verify that the "No blog posts available." message is displayed
    expect(screen.getByText(/No blog posts available./i)).toBeInTheDocument();
  });

  test('renders a BlogPostCard for each post', () => {
    const posts = [
      { _id: '1', title: 'Post 1', content: 'Content 1' },
      { _id: '2', title: 'Post 2', content: 'Content 2' },
      { _id: '3', title: 'Post 3', content: 'Content 3' }
    ];

    render(<BlogPostList posts={posts} />);
    
    // Query for all BlogPostCard dummy components by their test id
    const blogPostCards = screen.getAllByTestId('blog-post-card');
    
    // Check that the number of rendered cards matches the number of posts passed in
    expect(blogPostCards.length).toBe(posts.length);
    
    // Optionally, verify that each card displays its post _id
    posts.forEach(post => {
      expect(screen.getByText(post._id)).toBeInTheDocument();
    });
  });
});
