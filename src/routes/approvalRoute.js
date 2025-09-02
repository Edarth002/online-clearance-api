import express from "express";
import {
  approveClearance,
  rejectClearance,
} from "../controllers/approvalController.js";
import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.patch(
  "/:requestId/approve",
  auth,
  role("OFFICER", "ADMIN"),
  approveClearance
);
router.patch(
  "/:requestId/reject",
  auth,
  role("OFFICER", "ADMIN"),
  rejectClearance
);

export default router;
