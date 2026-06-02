const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const { env } = require("./config/env");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
//app.use(mongoSanitize());

app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
