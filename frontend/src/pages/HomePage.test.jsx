import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import AuthContext from '../contexts/AuthContext';

describe('HomePage', () => {
  test('renders welcome message for authenticated user', () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: true, username: 'testuser' }}>
        <HomePage />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
  });

  test('renders login prompt for unauthenticated user', () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <HomePage />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByText('Please log in or register to view blog posts.')).toBeInTheDocument();
  });
});