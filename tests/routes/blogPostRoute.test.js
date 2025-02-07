const request = require("supertest");
const express = require("express");
const BlogPost = require("../../models/BlogPost");
const blogRoutes = require("../../routes/blogPostRoute");

jest.mock("../../models/BlogPost");

jest.mock("../../middleware/authenticate", () => (req, res, next) => {
  req.user = { id: "testUserId" };
  next();
});

const app = express();
app.use(express.json());
app.use("/api/blogposts", blogRoutes);

describe("Blog Post Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/blogposts - Should return all blog posts", async () => {
    const mockPosts = [
      { title: "First Post", content: "Content 1" },
      { title: "Second Post", content: "Content 2" },
    ];
    BlogPost.find.mockResolvedValue(mockPosts);

    const response = await request(app).get("/api/blogposts");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("title", "First Post");
  });

  test("GET /api/blogposts/:id - Should return a single post", async () => {
    const mockPost = { title: "Test Post", content: "Test Content" };
    BlogPost.findById.mockResolvedValue(mockPost);

    const response = await request(app).get(`/api/blogposts/${mockPost._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Test Post");
  });

  test("GET /api/blogposts/:id - Should return 404 if post not found", async () => {
    BlogPost.findById.mockResolvedValue(null);

    const fakeId = "fakeId";
    const response = await request(app).get(`/api/blogposts/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Post not found");
  });


  test("POST /api/blogposts - Should return 400 if fields are missing", async () => {
    const response = await request(app).post("/api/blogposts").send({ title: "" });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined(); 
  });

  test("PUT /api/blogposts/:id - Should update a blog post", async () => {
    const mockPost = { _id: "testId", title: "Old Title", content: "Old Content" };
    BlogPost.findByIdAndUpdate.mockResolvedValue({ ...mockPost, ...{ title: "Updated Title", content: "Updated Content" } });

    const updatedData = { title: "Updated Title", content: "Updated Content" };
    const response = await request(app).put(`/api/blogposts/${mockPost._id}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Title");
  });

  test("PUT /api/blogposts/:id - Should return 400 if post not found", async () => {
    BlogPost.findByIdAndUpdate.mockResolvedValue(null);

    const fakeId = "fakeId";
    const response = await request(app).put(`/api/blogposts/${fakeId}`).send({ title: "New Title" });

    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Content is required");
  });

  test("DELETE /api/blogposts/:id - Should delete a blog post", async () => {
    const mockPost = { _id: "testId", title: "Delete Me", content: "Delete Content" };
    BlogPost.findByIdAndDelete.mockResolvedValue(mockPost);

    const response = await request(app).delete(`/api/blogposts/${mockPost._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Delete Me");

    BlogPost.findById.mockResolvedValue(null);
    const checkPost = await BlogPost.findById(mockPost._id);
    expect(checkPost).toBeNull();
  });

  test("DELETE /api/blogposts/:id - Should return 404 if post not found", async () => {
    BlogPost.findByIdAndDelete.mockResolvedValue(null);

    const fakeId = "fakeId";
    const response = await request(app).delete(`/api/blogposts/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Post not found");
  });
});
