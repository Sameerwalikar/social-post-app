import { client } from "../api/client";

export const postService = {
  list: (params) => client.get("/posts", { params }),
  create: (formData) =>
    client.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  like: (postId) => client.post(`/posts/${postId}/like`),
  comment: (postId, payload) => client.post(`/posts/${postId}/comment`, payload),
  remove: (postId) => client.delete(`/posts/${postId}`),
};
