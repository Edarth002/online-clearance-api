import express from "express";
import {
  uploadDocument,
  getDocuments,
} from "../controllers/documentController.js";
import auth from "../middlewares/authMiddleware.js";
import role from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/fileUploadMiddleware.js";

const router = express.Router();

router.post(
  "/upload-document",
  auth,
  role("STUDENT"),
  upload.single("document"),
  uploadDocument
);
router.get("/", auth, getDocuments); // both officers and students can fetch

export default router;
