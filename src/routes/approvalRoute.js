import express from "express";
import {
  approveClearance,
  rejectClearance,
} from "../controllers/approvalController.js";
import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.patch("/:requestId/approve", auth, role("OFFICER"), approveClearance);
router.patch("/:requestId/reject", auth, role("OFFICER"), rejectClearance);

export default router;
