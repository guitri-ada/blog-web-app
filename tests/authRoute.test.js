process.env.JWT_SECRET = "testsecret";

const express = require("express");
const request = require("supertest");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const UserProfiles = require("../models/UserProfiles");
const authRoute = require("../routes/authRoute");

jest.mock("../models/User");
jest.mock("../models/UserProfiles");

const JWT_SECRET = process.env.JWT_SECRET || "testsecret";

const createTestApp = () => {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());

    // Setup csurf middleware for testing and add a csrf token route.
    const csrfProtection = csrf({ cookie: true });
    app.use(csrfProtection);
    app.get("/csrf-token", (req, res) => {
        res.json({ csrfToken: req.csrfToken() });
    });

    // Mount auth routes under /api/auth
    app.use("/api/auth", authRoute);
    return app;
};

const getCsrfToken = async (app) => {
    const res = await request(app).get("/csrf-token");
    const csrfToken = res.body.csrfToken;
    const cookies = res.headers["set-cookie"];
    return { csrfToken, cookies };
};

describe("Auth Route", () => {
    let app;
    beforeEach(() => {
        jest.clearAllMocks();
        app = createTestApp();
    });

    describe("POST /api/auth/register", () => {
        test("should register a new user successfully", async () => {
            // Simulate no existing user.
            User.findOne.mockResolvedValue(null);
            // Simulate successful save for user and profile.
            const fakeUser = { _id: "user123", username: "testuser", save: jest.fn().mockResolvedValue() };
            User.mockImplementation(() => fakeUser);
            const fakeUserProfile = { save: jest.fn().mockResolvedValue() };
            UserProfiles.mockImplementation(() => fakeUserProfile);

            const { csrfToken, cookies } = await getCsrfToken(app);

            const res = await request(app)
                .post("/api/auth/register")
                .set("Cookie", cookies)
                .set("CSRF-Token", csrfToken)
                .send({ username: "testuser", email: "test@example.com", password: "Pass123!" });
            
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("User registered successfully!");
            expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
            expect(fakeUser.save).toHaveBeenCalled();
            expect(fakeUserProfile.save).toHaveBeenCalled();
        });

        test("should not register user when email already exists", async () => {
            User.findOne.mockResolvedValue({ _id: "existingUser" });

            const { csrfToken, cookies } = await getCsrfToken(app);

            const res = await request(app)
                .post("/api/auth/register")
                .set("Cookie", cookies)
                .set("CSRF-Token", csrfToken)
                .send({ username: "testuser", email: "test@example.com", password: "Pass123!" });
            
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("User already exists");
        });
    });

    describe("POST /api/auth/login", () => {
        test("should login successfully with correct credentials", async () => {
            const fakeUser = {
                _id: "user123",
                username: "testuser",
                password: "hashedPass",
            };
            User.findOne.mockResolvedValue(fakeUser);
            jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
            // Simulate a valid profile where all fields are set.
            UserProfiles.findOne.mockResolvedValue({
                firstname: "John",
                lastname: "Doe",
                bio: "Bio text"
            });

            const { csrfToken, cookies } = await getCsrfToken(app);

            const res = await request(app)
                .post("/api/auth/login")
                .set("Cookie", cookies)
                .set("CSRF-Token", csrfToken)
                .send({ email: "test@example.com", password: "Pass123!" });
            
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("Login successful!");
            expect(res.body.username).toBe("testuser");
            expect(res.body.hasProfile).toBe(true);
            expect(res.headers["set-cookie"].join()).toMatch(/authToken/);

            bcrypt.compare.mockRestore();
        });

        test("should fail login with non-existent email", async () => {
            User.findOne.mockResolvedValue(null);

            const { csrfToken, cookies } = await getCsrfToken(app);

            const res = await request(app)
                .post("/api/auth/login")
                .set("Cookie", cookies)
                .set("CSRF-Token", csrfToken)
                .send({ email: "nonexistent@example.com", password: "Pass123!" });
            
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("Invalid email or password");
        });

        test("should fail login with incorrect password", async () => {
            const fakeUser = {
                _id: "user123",
                username: "testuser",
                password: "hashedPass",
            };
            User.findOne.mockResolvedValue(fakeUser);
            jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

            const { csrfToken, cookies } = await getCsrfToken(app);

            const res = await request(app)
                .post("/api/auth/login")
                .set("Cookie", cookies)
                .set("CSRF-Token", csrfToken)
                .send({ email: "test@example.com", password: "WrongPass!" });
            
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("Invalid email or password");

            bcrypt.compare.mockRestore();
        });
    });

    describe("POST /api/auth/logout", () => {
        test("should clear authToken cookie and logout successfully", async () => {
            const { csrfToken, cookies } = await getCsrfToken(app);
            const res = await request(app)
                .post("/api/auth/logout")
                .set("Cookie", cookies)
                .set("CSRF-Token", csrfToken)
                .send();
            
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("Logged out successfully!");
            // Confirm that the authToken cookie is cleared
            expect(res.headers["set-cookie"].join()).toMatch(/authToken=;/);
        });
    });

    describe("GET /api/auth/check-auth", () => {
        test("should verify authentication with valid token", async () => {
            // Create a valid token manually
            const token = jwt.sign({ id: "user123", username: "testuser", hasProfile: true }, JWT_SECRET, { expiresIn: "1h" });
            // Simulate a profile with complete info
            UserProfiles.findOne.mockResolvedValue({
                firstname: "John",
                lastname: "Doe",
                bio: "Some bio"
            });
            const { csrfToken, cookies } = await getCsrfToken(app);
            // Append the authToken cookie to the cookies array
            const authCookie = `authToken=${token}; Path=/; HttpOnly`;
            const allCookies = cookies.concat(authCookie);
            
            const res = await request(app)
                .get("/api/auth/check-auth")
                .set("Cookie", allCookies)
                .set("CSRF-Token", csrfToken)
                .send();
            
            expect(res.statusCode).toBe(200);
            expect(res.body.authenticated).toBe(true);
            expect(res.body.username).toBe("testuser");
            expect(res.body.hasProfile).toBe(true);
        });

        test("should fail authentication with invalid token", async () => {
            const invalidToken = "invalidToken";
            const { csrfToken, cookies } = await getCsrfToken(app);
            const authCookie = `authToken=${invalidToken}; Path=/; HttpOnly`;
            const allCookies = cookies.concat(authCookie);

            const res = await request(app)
                .get("/api/auth/check-auth")
                .set("Cookie", allCookies)
                .set("CSRF-Token", csrfToken)
                .send();
            
            expect(res.statusCode).toBe(401);
            expect(res.body.authenticated).toBe(false);
        });
    });

    describe("GET /api/auth/userId/:username", () => {
        test("should return userId for valid username", async () => {
            User.findOne.mockResolvedValue({ _id: "user123", username: "testuser" });
            const res = await request(app)
                .get("/api/auth/userId/testuser")
                .send();
            
            expect(res.statusCode).toBe(200);
            expect(res.body.userId).toBe("user123");
        });

        test("should return 404 if user not found", async () => {
            User.findOne.mockResolvedValue(null);
            const res = await request(app)
                .get("/api/auth/userId/nonexistent")
                .send();
            
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("User not found");
        });
    });
});