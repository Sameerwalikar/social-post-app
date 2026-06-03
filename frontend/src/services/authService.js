import { client } from "../api/client";

export const authService = {
  register: (payload) => client.post("/auth/register", payload),
  login: (payload) => client.post("/auth/login", payload),
  me: () => client.get("/auth/me"),
  uploadAvatar: (formData) =>
    client.post("/auth/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
