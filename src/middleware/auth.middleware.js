const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.auth_token;

  if ((!authHeader || !authHeader.trim()) && !cookieToken) {
    return next(new ApiError(401, "Authorization token is required"));
  }

  try {
    let token = (authHeader || "").trim();

    if (!token) {
      token = cookieToken;
    }

    // Accept both "Bearer <token>" and raw token formats.
    while (/^Bearer\s+/i.test(token)) {
      token = token.replace(/^Bearer\s+/i, "").trim();
    }

    if (!token) {
      return next(new ApiError(401, "Authorization token is required"));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select("-password");

    if (!user) {
      return next(new ApiError(401, "Invalid token"));
    }

    if (user.status !== "active") {
      return next(new ApiError(403, "User account is inactive"));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}

module.exports = {
  authenticateUser
};
