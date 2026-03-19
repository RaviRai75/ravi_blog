import express from "express";
import {
  getStats,
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/upload-auth", uploadAuth);
router.get("/stats", getStats);
router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", requireAuth(), createPost);
router.delete("/:id", requireAuth(), deletePost);
router.put("/:id", requireAuth(), updatePost);
router.patch("/feature", requireAuth(), featurePost);

export default router;
