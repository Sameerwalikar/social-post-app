const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    likes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        username: { type: String, required: true },
      },
    ],
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        username: { type: String, required: true },
        text: { type: String, required: true, trim: true, maxlength: 500 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

postSchema.pre("validate", function ensureContent(next) {
  const hasText = Boolean((this.text || "").trim());
  const hasImage = Boolean(this.image);
  if (!hasText && !hasImage) {
    return next(new Error("Post must contain text, image, or both"));
  }
  return next();
});

postSchema.index({ createdAt: -1 });

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
