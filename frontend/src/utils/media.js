export const resolveMediaUrl = (src) => {
  if (!src) return "";
  if (typeof src !== "string") return "";
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return `${(import.meta.env.VITE_SERVER_URL || "http://localhost:5000").replace(/\/$/, "")}${src}`;
};
