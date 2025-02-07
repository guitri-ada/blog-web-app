const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("User Model", () => {
  test("should hash password before saving", async () => {
    const plainPassword = "TestPassword123!";
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: plainPassword,
    });

    await user.save();
    
    expect(user.password).not.toBe(plainPassword);
    const isMatch = await bcrypt.compare(plainPassword, user.password);
    expect(isMatch).toBe(true);
  });

  test("should not rehash password if not modified", async () => {
    const plainPassword = "TestPassword123!";
    const user = new User({
      username: "testuser2",
      email: "test2@example.com",
      password: plainPassword,
    });

    await user.save();
    const firstHash = user.password;

    // Update email without modifying password
    user.email = "updated@example.com";
    await user.save();

    expect(user.password).toBe(firstHash);
  });
});