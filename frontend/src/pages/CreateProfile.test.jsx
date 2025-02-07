import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateProfile from './CreateProfile';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CreateProfile', () => {
  const fakeUsername = 'testuser';
  const fakeLogin = jest.fn();

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ username: fakeUsername, login: fakeLogin }}>
          <CreateProfile />
        </AuthContext.Provider>
      </BrowserRouter>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements', async () => {
    axios.get.mockResolvedValueOnce({ data: { csrfToken: 'mock-csrf-token' } });
    await act(async () => {
      renderComponent();
    });

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Profile/i })).toBeInTheDocument();
  });

  test('successful profile update and navigation', async () => {
    jest.useFakeTimers();
    axios.get.mockResolvedValueOnce({ data: { csrfToken: 'mock-csrf-token' } });
    axios.put.mockResolvedValueOnce({ status: 200 });
    
    await act(async () => {
      renderComponent();
    });
    
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Bio/i), { target: { value: 'A short bio.' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Create Profile/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Profile updated successfully!/i)).toBeInTheDocument();
    });
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(fakeLogin).toHaveBeenCalledWith(fakeUsername, true);
    expect(mockNavigate).toHaveBeenCalledWith('/blogposts');
    jest.useRealTimers();
  });

  test('failed profile update shows error message', async () => {
    axios.get.mockResolvedValueOnce({ data: { csrfToken: 'mock-csrf-token' } });
    axios.put.mockRejectedValueOnce(new Error('Update failed'));
    
    await act(async () => {
      renderComponent();
    });

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/Bio/i), { target: { value: 'Another bio.' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Create Profile/i }));

    await waitFor(() => {
      expect(screen.getByText(/An error occurred. Please try again./i)).toBeInTheDocument();
    });
  });
});