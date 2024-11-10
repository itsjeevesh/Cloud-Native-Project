import { Router } from "express";
import { getUserData } from "../controllers/userDataController.js";

const router = Router();

router.get("/get", getUserData);

export default router;