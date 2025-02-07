const request = require("supertest");
const express = require("express");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userProfilesRoute = require("../../routes/userProfilesRoute");
const UserProfiles = require("../../models/UserProfiles");
const User = require("../../models/User");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use("/userProfiles", userProfilesRoute);

jest.mock("../../models/UserProfiles");
jest.mock("../../models/User");

describe("UserProfiles Route", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /userProfiles", () => {
        it("should return all user profiles", async () => {
            const mockProfiles = [{ user: "1", firstname: "John", lastname: "Doe" }];
            UserProfiles.find.mockResolvedValue(mockProfiles);

            const res = await request(app).get("/userProfiles");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockProfiles);
        });

        it("should handle errors", async () => {
            UserProfiles.find.mockRejectedValue(new Error("Failed to fetch"));

            const res = await request(app).get("/userProfiles");

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ message: "Failed to fetch user profiles" });
        });
    });

    describe("GET /userProfiles/:username", () => {
        it("should return a user profile by username", async () => {
            const mockUser = { _id: "1", username: "johndoe" };
            const mockProfile = { user: "1", firstname: "John", lastname: "Doe" };
            User.findOne.mockResolvedValue(mockUser);
            UserProfiles.findOne.mockResolvedValue(mockProfile);

            const res = await request(app).get("/userProfiles/johndoe");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockProfile);
        });

        it("should return 404 if user not found", async () => {
            User.findOne.mockResolvedValue(null);

            const res = await request(app).get("/userProfiles/johndoe");

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ message: "User not found" });
        });

        it("should return 404 if profile not found", async () => {
            const mockUser = { _id: "1", username: "johndoe" };
            User.findOne.mockResolvedValue(mockUser);
            UserProfiles.findOne.mockResolvedValue(null);

            const res = await request(app).get("/userProfiles/johndoe");

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ message: "User profile not found" });
        });

        it("should handle errors", async () => {
            User.findOne.mockRejectedValue(new Error("Failed to fetch"));

            const res = await request(app).get("/userProfiles/johndoe");

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ message: "Failed to fetch user profile" });
        });
    });
});