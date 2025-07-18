import express from "express";
import {
  approveRequest,
  rejectRequest,
} from "../controllers/approvalController.js";
import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.patch("/:requestId/approve", auth, role("OFFICER"), approveRequest);
router.patch("/:requestId/reject", auth, role("OFFICER"), rejectRequest);

export default router;
