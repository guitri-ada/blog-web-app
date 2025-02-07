const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("../../models/BlogPost");
const blogRoutes = require("../../routes/blogPostRoute");
const authenticate = require("../../middleware/authenticate");

jest.mock("../../middleware/authenticate", () => (req, res, next) => {
  req.user = { id: "testUserId" };
  next();
});

const app = express();
app.use(express.json());
app.use("/api/blogposts", blogRoutes);

describe("Blog Post Routes", () => {

  beforeAll(async () => {
    global.alert = jest.fn();
    await mongoose.connect("mongodb://localhost:27017/testdb", {
    });
  });

  afterEach(async () => {
    await BlogPost.deleteMany();
  });

  afterAll(async () => {
    global.alert.mockRestore();
    await mongoose.connection.close();
  });

  test("GET /api/blogposts - Should return all blog posts", async () => {
    await BlogPost.create([
      { title: "First Post", content: "Content 1" },
      { title: "Second Post", content: "Content 2" },
    ]);

    const response = await request(app).get("/api/blogposts");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("title", "First Post");
  });

  test("GET /api/blogposts/:id - Should return a single post", async () => {
    const post = await BlogPost.create({ title: "Test Post", content: "Test Content" });

    const response = await request(app).get(`/api/blogposts/${post._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Test Post");
  });

  test("GET /api/blogposts/:id - Should return 404 if post not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/blogposts/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Post not found");
  });

  test("POST /api/blogposts - Should create a new blog post", async () => {
    const newPost = { title: "New Post", content: "New Content" };

    const response = await request(app).post("/api/blogposts").send(newPost);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", "New Post");
  });

  test("POST /api/blogposts - Should return 400 if fields are missing", async () => {
    const response = await request(app).post("/api/blogposts").send({ title: "" });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined(); 
  });

  test("PUT /api/blogposts/:id - Should update a blog post", async () => {
    const post = await BlogPost.create({ title: "Old Title", content: "Old Content" });

    const updatedData = { title: "Updated Title", content: "Updated Content" };

    const response = await request(app).put(`/api/blogposts/${post._id}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Title");
  });

  test("PUT /api/blogposts/:id - Should return 400 if post not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).put(`/api/blogposts/${fakeId}`).send({ title: "New Title" });

    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Content is required");

  });

  test("DELETE /api/blogposts/:id - Should delete a blog post", async () => {
    const post = await BlogPost.create({ title: "Delete Me", content: "Delete Content" });

    const response = await request(app).delete(`/api/blogposts/${post._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Delete Me");

    const checkPost = await BlogPost.findById(post._id);
    expect(checkPost).toBeNull();
  });

  test("DELETE /api/blogposts/:id - Should return 404 if post not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).delete(`/api/blogposts/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Post not found");
  });
});
