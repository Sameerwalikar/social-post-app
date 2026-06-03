const { User } = require("../models/User");
const { issueToken } = require("../services/authService");
const { ApiError } = require("../utils/apiError");
const { successResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middleware/asyncHandler");

const normalizeImagePath = (filePath) =>
  filePath.replace(process.cwd(), "").replace(/\\/g, "/");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) throw new ApiError(409, "Email or username already exists");

  const user = await User.create({ username, email, password });
  const token = issueToken(user._id);

  return successResponse(
    res,
    {
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    },
    201
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const validPassword = await user.comparePassword(password);
  if (!validPassword) throw new ApiError(401, "Invalid credentials");

  const token = issueToken(user._id);
  return successResponse(res, {
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
});

const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Avatar image is required");
  }

  req.user.avatar = normalizeImagePath(req.file.path);
  await req.user.save();

  return successResponse(res, {
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar,
    },
  });
});

const me = asyncHandler(async (req, res) => successResponse(res, { user: req.user }));

module.exports = { register, login, me, updateAvatar };
