const request = require("supertest");
const app = require("../server");

describe("Server", () => {
  test("GET / should return status 200 with expected message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Server is running, and MongoDB is connected!");
  });

  test("GET /api/csrf-token should return a valid CSRF token", async () => {
    const res = await request(app).get("/api/csrf-token");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("csrfToken");
    expect(typeof res.body.csrfToken).toBe("string");
  });
});