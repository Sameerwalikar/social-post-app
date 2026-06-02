const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  toggleLike,
  addComment,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/errorMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { createPostValidator, listPostsValidator } = require("../validators/postValidators");
const { commentValidator } = require("../validators/authValidators");

const router = express.Router();

router.get("/", listPostsValidator, validateRequest, getPosts);
router.get("/:id", getPostById);
router.post("/", protect, upload.single("image"), createPostValidator, validateRequest, createPost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, commentValidator, validateRequest, addComment);

module.exports = router;
