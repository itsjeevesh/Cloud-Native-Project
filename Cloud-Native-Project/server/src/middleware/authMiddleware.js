import { verifyToken } from "../utils/jwtUtils.js";

/**
 * Middleware to authenticate requests using a token stored in cookies.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.cookies - Cookies attached to the request.
 * @param {string} req.cookies.token - Token stored in cookies.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Proceeds to the next middleware or route handler if authentication is successful.
 *
 * @throws {Error} 401 - If no token is found in cookies.
 * @throws {Error} 401 - If the token is invalid.
 */
const authMiddleware = (req, res, next) => {
  // Retrieve the token from cookies
  const token = req.cookies.token;

  // If no token is found, respond with a 401 status and an error message
  if (!token) {
    return res.status(401).json({ message: "No user found" });
  }

  // Verify the token
  const decoded = verifyToken(token);

  // If the token is invalid, respond with a 401 status and an error message
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Attach the userId from the decoded token to the request object
  req.userId = decoded.userId;

  // Proceed to the next middleware or route handler
  next();
};

export default authMiddleware;