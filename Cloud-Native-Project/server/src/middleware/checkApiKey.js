import { apiKey } from "../utils/constants.js";

/**
 * Middleware to check the validity of the API key provided in the request headers.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} req.headers["x-api-key"] - The API key provided in the request headers.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a 401 status with a message if the API key is missing.
 * @returns {Object} - Returns a 403 status with a message if the API key is invalid.
 */
const checkApiKey = (req, res, next) => {
  // Get the apikey from headers
  const key = req.headers["x-api-key"];

  // Get the valid api key
  const validApiKey = apiKey;

  // Check if the apikey was passed
  if (!key) return res.status(401).json({ message: "API key is missing" });

  // Check if the apikey is valid
  if (key !== validApiKey)
    return res.status(403).json({ message: "Invalid API Key" });

  next();
};

export default checkApiKey;
