import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import axios from "axios";
import useBlogPosts from "./useBlogPosts";

// Mock axios
jest.mock("axios");

describe("useBlogPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches blog posts successfully", async () => {
    const mockPosts = [
      { _id: "1", title: "First Post", content: "Content 1" },
      { _id: "2", title: "Second Post", content: "Content 2" },
    ];
    
    axios.get.mockResolvedValueOnce({ data: mockPosts });

    const { result } = renderHook(() => useBlogPosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.error).toBe(null);
  });


  test("handles error when fetching blog posts fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useBlogPosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch blog posts.");
  });


  test("creates a blog post successfully", async () => {
    const newPost = { title: "New Post", content: "New content" };
    const createdPost = { _id: "3", ...newPost };

    axios.post.mockResolvedValueOnce({ data: createdPost });

    // Mock the window.alert method to prevent the error
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const { result } = renderHook(() => useBlogPosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.createPost(newPost);
    });

    expect(result.current.posts).toContainEqual(createdPost);
    expect(axios.post).toHaveBeenCalledWith("/api/blogposts", newPost);

    // Ensure that the alert was called
    expect(alertMock).toHaveBeenCalledWith("Blog post created successfully!");

    // Restore the original alert function after the test
    alertMock.mockRestore();
  });


  test("handles error when creating a blog post fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Post creation failed"));

    // Mock the window.alert method to prevent the error
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const { result } = renderHook(() => useBlogPosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.createPost({ title: "Fail Post", content: "Failed content" });
    });

    expect(alertMock).toHaveBeenCalledWith("Failed to create blog post.");

    // Restore the original alert function after the test
    alertMock.mockRestore();
  });


  test("edits a blog post successfully", async () => {
    const initialPosts = [{ _id: "1", title: "Old Title", content: "Old content" }];
    const updatedData = { title: "Updated Title", content: "Updated content" };
    const updatedPost = { _id: "1", ...updatedData };

    axios.get.mockResolvedValueOnce({ data: initialPosts });
    axios.put.mockResolvedValueOnce({ data: updatedPost });

    const { result } = renderHook(() => useBlogPosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.editPost("1", updatedData);
    });


    expect(result.current.posts).toContainEqual(updatedPost);
    expect(axios.put).toHaveBeenCalledWith("/api/blogposts/1", updatedData);
  });


  test("handles error when editing a blog post fails", async () => {
    axios.put.mockRejectedValueOnce(new Error("Update failed"));

    const { result } = renderHook(() => useBlogPosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.editPost("1", { title: "Fail Update" });
    });

    expect(result.current.error).toBe("Failed to update blog post.");
  });


  test("deletes a blog post successfully", async () => {
    const initialPosts = [{ _id: "1", title: "Post to Delete", content: "Content" }];

    axios.get.mockResolvedValueOnce({ data: initialPosts });
    axios.delete.mockResolvedValueOnce();

    const { result } = renderHook(() => useBlogPosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deletePost("1");
    });

    expect(result.current.posts).toEqual([]);
    expect(axios.delete).toHaveBeenCalledWith("/api/blogposts/1");
  });

  
  test("handles error when deleting a blog post fails", async () => {
    axios.delete.mockRejectedValueOnce(new Error("Delete failed"));

    const { result } = renderHook(() => useBlogPosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deletePost("1");
    });

    expect(result.current.error).toBe("Failed to delete blog post.");
  });
});
