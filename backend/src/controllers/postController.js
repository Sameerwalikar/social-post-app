const { Post } = require("../models/Post");
const { ApiError } = require("../utils/apiError");
const { successResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middleware/asyncHandler");

const normalizeImagePath = (filePath) => filePath.replace(process.cwd(), "").replace(/\\/g, "/");

const createPost = asyncHandler(async (req, res) => {
  const text = (req.body.text || "").trim();
  const image = req.file ? normalizeImagePath(req.file.path) : "";

  if (!text && !image) {
    throw new ApiError(400, "Post must contain text, image, or both");
  }

  const post = await Post.create({
    user: req.user._id,
    text,
    image,
  });

  const populated = await post.populate("user", "username avatar");
  return successResponse(res, { post: populated }, 201);
});

const getPosts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username avatar"),
    Post.countDocuments(),
  ]);

  return successResponse(res, {
    posts,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + posts.length < total,
    },
  });
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", "username avatar");
  if (!post) throw new ApiError(404, "Post not found");
  return successResponse(res, { post });
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");
  if (String(post.user) !== String(req.user._id)) {
    throw new ApiError(403, "You can delete only your own posts");
  }
  await post.deleteOne();
  return successResponse(res, { message: "Post deleted successfully" });
});

const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");

  const existingIndex = post.likes.findIndex(
    (item) => String(item.userId) === String(req.user._id)
  );

  if (existingIndex >= 0) {
    post.likes.splice(existingIndex, 1);
  } else {
    post.likes.push({ userId: req.user._id, username: req.user.username });
  }

  await post.save();
  return successResponse(res, {
    liked: existingIndex < 0,
    likesCount: post.likes.length,
    likes: post.likes,
  });
});

const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");

  post.comments.push({
    userId: req.user._id,
    username: req.user.username,
    text: req.body.text.trim(),
    createdAt: new Date(),
  });

  await post.save();
  return successResponse(res, {
    comments: post.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    commentsCount: post.comments.length,
  });
});

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  toggleLike,
  addComment,
};
