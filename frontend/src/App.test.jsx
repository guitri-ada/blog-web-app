import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./AppContent.jsx", () => {
  return function DummyAppContent() {
    return <div data-testid="app-content">App Content</div>;
  };
});

describe("App", () => {
  test("renders AppContent wrapped with AuthProvider and Router", () => {
    render(<App />);
    const appContentElement = screen.getByTestId("app-content");
    expect(appContentElement).toBeInTheDocument();
    expect(appContentElement).toHaveTextContent("App Content");
  });
});
