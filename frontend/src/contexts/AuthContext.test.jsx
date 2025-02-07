import React, { useContext } from "react";
import { render, waitFor, act } from "@testing-library/react";
import AuthContext, { AuthProvider } from "./AuthContext";

// A simple consumer component to read and display context values
const DummyConsumer = () => {
  const { isAuthenticated, username, hasProfile, csrfToken, login, logout } =
    useContext(AuthContext);
  return (
    <div data-testid="auth-values">
      <span data-testid="isAuthenticated">
        {isAuthenticated ? "true" : "false"}
      </span>
      <span data-testid="username">{username}</span>
      <span data-testid="hasProfile">{hasProfile ? "true" : "false"}</span>
      <span data-testid="csrfToken">{csrfToken}</span>
      <button data-testid="login" onClick={() => login("testuser", true)}>
        Login
      </button>
      <button data-testid="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("fetches auth status and csrf token on mount", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ username: "user1", hasProfile: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ csrfToken: "abc123" }),
      });

    const { getByTestId } = render(
      <AuthProvider>
        <DummyConsumer />
      </AuthProvider>
    );

    // Wait until the asynchronous useEffect has updated the state
    await waitFor(() =>
      expect(getByTestId("isAuthenticated").textContent).toBe("true")
    );
    expect(getByTestId("username").textContent).toBe("user1");
    expect(getByTestId("hasProfile").textContent).toBe("true");
    expect(getByTestId("csrfToken").textContent).toBe("abc123");
  });

  test("login updates state", async () => {
    // Simulate the initial fetch calls resulting in a "not authenticated" state.
    global.fetch
      .mockResolvedValueOnce({
        ok: false, // simulate check-auth failure
        json: async () => ({}),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ csrfToken: "initToken" }),
      });

    const { getByTestId } = render(
      <AuthProvider>
        <DummyConsumer />
      </AuthProvider>
    );

    // Wait until the initial fetch calls complete; we expect not authenticated
    await waitFor(() =>
      expect(getByTestId("isAuthenticated").textContent).toBe("false")
    );

    // Simulate a login
    act(() => {
      getByTestId("login").click();
    });

    expect(getByTestId("isAuthenticated").textContent).toBe("true");
    expect(getByTestId("username").textContent).toBe("testuser");
    expect(getByTestId("hasProfile").textContent).toBe("true");
  });

  test("logout resets state on successful logout", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ username: "user1", hasProfile: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ csrfToken: "abc123" }),
      });

    const { getByTestId } = render(
      <AuthProvider>
        <DummyConsumer />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(getByTestId("isAuthenticated").textContent).toBe("true")
    );

    // mock the logout fetch call
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await act(async () => {
      getByTestId("logout").click();
    });

    // Wait until the state is reset.
    await waitFor(() =>
      expect(getByTestId("isAuthenticated").textContent).toBe("false")
    );
    expect(getByTestId("username").textContent).toBe("");
    expect(getByTestId("hasProfile").textContent).toBe("false");
  });
});
