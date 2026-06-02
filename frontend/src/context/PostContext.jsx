import { createContext, useCallback, useMemo, useState } from "react";
import { postService } from "../services/postService";

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, hasMore: true });
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async ({ page = 1, reset = false } = {}) => {
    setLoading(true);
    try {
      const response = await postService.list({ page, limit: 10 });
      const incoming = response.data.posts;
      setPosts((prev) => (reset ? incoming : [...prev, ...incoming]));
      setPagination(response.data.pagination);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (formData) => {
    const response = await postService.create(formData);
    setPosts((prev) => [response.data.post, ...prev]);
    return response.data.post;
  }, []);

  const toggleLike = useCallback(async (postId) => {
    const snapshot = posts;
    setPosts((prev) =>
      prev.map((post) => {
        if (post._id !== postId) return post;
        const currentUserId = localStorage.getItem("social_feed_user")
          ? JSON.parse(localStorage.getItem("social_feed_user"))._id
          : null;
        const alreadyLiked = post.likes.some((like) => String(like.userId) === String(currentUserId));
        return {
          ...post,
          likes: alreadyLiked
            ? post.likes.filter((like) => String(like.userId) !== String(currentUserId))
            : [...post.likes, { userId: currentUserId, username: "You" }],
        };
      })
    );

    try {
      const response = await postService.like(postId);
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? { ...post, likes: response.data.likes } : post))
      );
    } catch (error) {
      setPosts(snapshot);
      throw error;
    }
  }, [posts]);

  const addComment = useCallback(async (postId, text) => {
    const response = await postService.comment(postId, { text });
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? { ...post, comments: response.data.comments }
          : post
      )
    );
    return response.data.comments;
  }, []);

  const value = useMemo(
    () => ({ posts, pagination, loading, fetchPosts, createPost, toggleLike, addComment }),
    [posts, pagination, loading, fetchPosts, createPost, toggleLike, addComment]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
