const express = require("express");
const { register, login, me, updateAvatar } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/errorMiddleware");
const { registerValidator, loginValidator } = require("../validators/authValidators");
const { upload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/avatar", protect, upload.single("avatar"), updateAvatar);
router.get("/me", protect, me);

module.exports = router;
