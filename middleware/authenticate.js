const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  // Retrieve the token from cookies
  const token = req.cookies.authToken;

  // If no token is found, send 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token; jwt.verify throws an error if token is invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded token payload to the request object for downstream middleware/routes
    req.user = decoded;
    next();
  } catch (err) {
    // Token verification failed – send 401 Unauthorized response with error message
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticate;
