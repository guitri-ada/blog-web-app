import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AuthContext from '../contexts/AuthContext.jsx';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

describe('ProtectedRoute', () => {
  const renderWithRouter = (ui, { route = '/protected' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: MemoryRouter });
  };

  const renderProtectedRoute = (authValue, requireProfile, initialPath = '/protected') =>
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <AuthContext.Provider value={authValue}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute requireProfile={requireProfile}>
                  <LocationDisplay />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LocationDisplay />} />
            <Route path="/create-profile" element={<LocationDisplay />} />
            <Route path="/" element={<LocationDisplay />} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

  test('redirects to /login when not authenticated', async () => {
    renderProtectedRoute({ isAuthenticated: false, hasProfile: false }, true);
    const locationDisplay = await screen.findByTestId('location-display');
    expect(locationDisplay).toHaveTextContent('/login');
  });

  test('redirects to /create-profile when authenticated but profile is required and missing', async () => {
    renderProtectedRoute({ isAuthenticated: true, hasProfile: false }, true);
    const locationDisplay = await screen.findByTestId('location-display');
    expect(locationDisplay).toHaveTextContent('/create-profile');
  });

  test('redirects to / when authenticated but profile should not exist', async () => {
    renderProtectedRoute({ isAuthenticated: true, hasProfile: true }, false);
    const locationDisplay = await screen.findByTestId('location-display');
    expect(locationDisplay).toHaveTextContent('/');
  });

  test('renders children when authenticated and profile matches requirement (profile required and exists)', async () => {
    renderProtectedRoute({ isAuthenticated: true, hasProfile: true }, true);
    const locationDisplay = await screen.findByTestId('location-display');
    expect(locationDisplay).toHaveTextContent('/protected');
  });

  test('renders children when authenticated and profile is not required (and no profile)', async () => {
    renderProtectedRoute({ isAuthenticated: true, hasProfile: false }, false);
    const locationDisplay = await screen.findByTestId('location-display');
    expect(locationDisplay).toHaveTextContent('/protected');
  });
});