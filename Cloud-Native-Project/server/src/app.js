import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js"
import userDataRoutes from "./routes/userDataRoutes.js";

import checkApiKey from "./middleware/checkApiKey.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api", checkApiKey);
app.use("/api/app", authMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/app/userData", userDataRoutes);

export default app;