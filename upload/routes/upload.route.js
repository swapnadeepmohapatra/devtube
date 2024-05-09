import express from "express";
import {
  completeUpload,
  initializeUpload,
  uploadChunk,
} from "../controllers/upload.controller.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post("/initialize", upload.none(), initializeUpload);

router.post("/", upload.single("chunk"), uploadChunk);

router.post("/complete", completeUpload);

export default router;
