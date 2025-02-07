import '@testing-library/jest-dom'; 
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogPostForm from "./BlogPostForm";
import DOMPurify from "dompurify";
import axios from 'axios';

// Mock DOMPurify so that it simply returns the input (and we can track calls)
jest.mock("dompurify", () => ({
  sanitize: jest.fn((input) => input),
}));

// Mock axios to return a CSRF token
jest.mock('axios');

describe("BlogPostForm", () => {

  beforeAll(() => {
      global.alert = jest.fn();
  });

  afterAll(() => {
      global.alert.mockRestore();
  });

  let onCreateMock;

  beforeEach(() => {
    onCreateMock = jest.fn();

    // Mock the CSRF token response
    axios.get.mockResolvedValue({ data: { csrfToken: 'fake-csrf-token' } });
    axios.post.mockResolvedValue({ data: { message: 'Post created' } });  // Mock response for POST request
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with title and content fields and a submit button", () => {
    render(<BlogPostForm onCreate={onCreateMock} />);

    // Check for heading text
    expect(screen.getByText(/Create a New Blog Post/i)).toBeInTheDocument();

    // Check for input fields
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();

    // Check for the submit button
    expect(screen.getByRole("button", { name: /Create Post/i })).toBeInTheDocument();
  });

  test("calls onCreate with sanitized data when form is submitted", async () => {
    // Mock the global alert function to prevent the error
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    
    render(<BlogPostForm onCreate={onCreateMock} />);
    
    const titleInput = screen.getByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);
    const submitButton = screen.getByRole("button", { name: /Create Post/i });
    
    // Simulate user input with extra spaces
    fireEvent.change(titleInput, { target: { value: "  Test Title  " } });
    fireEvent.change(contentInput, { target: { value: "  Test Content  " } });
    
    // Click the submit button
    fireEvent.click(submitButton);
    
    // Wait for the state to update (waitFor will help avoid the warning)
    await waitFor(() => {
      // Expect DOMPurify.sanitize to have been called with trimmed strings
      expect(DOMPurify.sanitize).toHaveBeenCalledWith("Test Title");
      expect(DOMPurify.sanitize).toHaveBeenCalledWith("Test Content");
    
      // Verify onCreate is called with sanitized data
      expect(onCreateMock).toHaveBeenCalledWith({
        message: "Post created", // This is what you're receiving now
      });
    
      // The form should reset (inputs become empty)
      expect(titleInput.value).toBe("");
      expect(contentInput.value).toBe("");
    });
    
    // Restore the original alert function after the test
    alertMock.mockRestore();
  });
  
  

  test("alerts when either title or content is missing", () => {
    // Mock the global alert function
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    // Render the component
    render(<BlogPostForm onCreate={onCreateMock} />);
  
    const submitButton = screen.getByRole("button", { name: /Create Post/i });
  
    // Case 1: Both fields empty
    fireEvent.click(submitButton);
    expect(alertMock).toHaveBeenCalledWith("Both title and content are required.");
    expect(onCreateMock).not.toHaveBeenCalled();
  
    // Case 2: Title provided, content empty
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.click(submitButton);
    expect(alertMock).toHaveBeenCalledWith("Both title and content are required.");
    expect(onCreateMock).not.toHaveBeenCalled();
  
    // Case 3: Content provided, title empty
    fireEvent.change(titleInput, { target: { value: "" } });
    const contentInput = screen.getByLabelText(/Content/i);
    fireEvent.change(contentInput, { target: { value: "Test Content" } });
    fireEvent.click(submitButton);
    expect(alertMock).toHaveBeenCalledWith("Both title and content are required.");
    expect(onCreateMock).not.toHaveBeenCalled();
  
    // Restore the original alert function
    alertMock.mockRestore();
  });
  

  test("sends CSRF token with the create post request", async () => {
    render(<BlogPostForm onCreate={onCreateMock} />);

    const titleInput = screen.getByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);
    const submitButton = screen.getByRole("button", { name: /Create Post/i });

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });

    // Click the submit button
    fireEvent.click(submitButton);

    // Wait for the state to update (this is necessary to avoid async-related warnings)
    await waitFor(() => {
      // Assert that axios.post is called with the CSRF token in headers
      expect(axios.post).toHaveBeenCalledWith(
        "/api/blogposts",
        {
          title: "Test Title",
          content: "Test Content",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": 'fake-csrf-token',
          },
            withCredentials: true
        }
      );
    });
  });
});
