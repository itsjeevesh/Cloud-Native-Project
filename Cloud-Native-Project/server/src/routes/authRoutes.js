import { Router } from "express";
import {
  loginController,
  userController,
} from "../controllers/authController.js";

/**
 * Initializes the router for handling authentication routes.
 *
 * @constant {Router} router - The router instance used to define authentication routes.
 */
const router = Router();

// Define the login route and attach the loginController to handle the request
router.post("/login", loginController);

// Define the user route and attach the userController to handle the request
router.get("/user", userController);

export default router;