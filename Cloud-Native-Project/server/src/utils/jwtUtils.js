import jwt from "jsonwebtoken";

import { jwtSecret } from "./constants.js";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "1 day" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
