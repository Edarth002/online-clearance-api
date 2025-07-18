import express from "express";
import { getAllRequests } from "../controllers/adminController.js";
import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/requests", auth, role("ADMIN"), getAllRequests);

export default router;
