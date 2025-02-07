const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

describe("authenticate middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { cookies: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("should return 401 when no token is provided", () => {
    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 401 when token is invalid", () => {
    req.cookies.authToken = "invalidToken";
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid or expired token" });
    expect(next).not.toHaveBeenCalled();
    jwt.verify.mockRestore();
  });

  test("should call next and set req.user when token is valid", () => {
    req.cookies.authToken = "validToken";
    const decoded = { id: "123", username: "testuser" };
    jest.spyOn(jwt, "verify").mockReturnValue(decoded);

    authenticate(req, res, next);
    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
    jwt.verify.mockRestore();
  });
});