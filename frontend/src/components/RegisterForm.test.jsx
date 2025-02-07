import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import AuthContext from '../contexts/AuthContext';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (isAuthenticated = false) => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isAuthenticated }}>
          <RegisterForm />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  test('renders the form elements', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ csrfToken: 'mock-csrf-token' }),
    });

    await act(async () => {
      renderComponent();
    });

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('redirects to home if already authenticated', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ csrfToken: 'mock-csrf-token' }),
    });

    await act(async () => {
      renderComponent(true);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('displays error message on failed registration', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ csrfToken: 'mock-csrf-token' }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Registration failed' }),
      });

    await act(async () => {
      renderComponent();
    });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/registration failed/i);
    });
  });

  test('displays success message and navigates to login on successful registration', async () => {
    jest.useFakeTimers();

    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ csrfToken: 'mock-csrf-token' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Registration successful!' }),
      });

    await act(async () => {
      renderComponent();
    });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/registration successful/i);
    });

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    jest.useRealTimers();
  });
});