import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import AuthContext from '../contexts/AuthContext.jsx';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });

  const renderComponent = (authContextValue = { isAuthenticated: false, login: jest.fn() }) => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={authContextValue}>
          <LoginForm />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  test('renders email, password fields and login button', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ csrfToken: 'mock-csrf-token' }),
    });

    await act(async () => {
      renderComponent();
    });

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('displays success message and navigates on successful login', async () => {
    jest.useFakeTimers();
    const loginMock = jest.fn();
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ csrfToken: 'mock-csrf-token' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: 'Login successful!',
          username: 'testuser',
          hasProfile: true,
        }),
      });

    await act(async () => {
      renderComponent({ isAuthenticated: false, login: loginMock });
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
    });
    expect(loginMock).toHaveBeenCalledWith('testuser', true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/blogposts');
    jest.useRealTimers();
  });

  test('displays error message on login failure', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ csrfToken: 'mock-csrf-token' }),
    });
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Login failed' }),
    });

    await act(async () => {
      renderComponent({ isAuthenticated: false, login: jest.fn() });
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });
});