import data from "./data.js";
import bcrypt from "bcrypt";
import { generateToken } from "./jwtUtils.js";

export const checkExistingUser = (email) => {
  return data.find((user) => user.email === email);
};

export const loginUser = async (email, password) => {
  const user = checkExistingUser(email);
  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const match = password === user.password;
  if (!match) {
    throw new Error("Invalid password");
  }

  return generateToken(user.id);
};
