import express from "express";
import {
  uploadDocument,
  getDocuments,
} from "../controllers/documentController.js";
import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", auth, role("STUDENT"), uploadDocument);
router.get("/", auth, getDocuments); // both officers and students can fetch

export default router;
