import { checkExistingUser, loginUser } from "../utils/authUtils.js";
import { verifyToken } from "../utils/jwtUtils.js";
import data from "../utils/data.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const token = await loginUser(email, password);
    return res
      .status(200)
      .json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error(error);
    if (error.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    } else if (error.message === "Invalid password") {
      return res.status(401).json({ message: "Invalid password" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const userController = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = data.find((user) => user.id === decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid user ID" });
    }

    return res.status(200).json({ userData: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
