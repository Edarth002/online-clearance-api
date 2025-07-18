import express from "express";
import {
  submitRequest,
  getStatus,
} from "../controllers/clearanceController.js";
import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", auth, role("STUDENT"), submitRequest);
router.get("/", auth, role("STUDENT"), getStatus);

export default router;
