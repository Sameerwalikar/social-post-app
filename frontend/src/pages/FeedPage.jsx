import { useCallback, useEffect, useRef } from "react";
import { Avatar, Box, Button, Container, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { CreatePostCard } from "../components/CreatePostCard";
import { EmptyState } from "../components/EmptyState";
import { FeedSkeleton } from "../components/FeedSkeleton";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../hooks/useAuth";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { usePosts } from "../hooks/usePosts";

export const FeedPage = () => {
  const sentinelRef = useRef(null);
  const { user, logout } = useAuth();
  const { posts, loading, pagination, fetchPosts, createPost, toggleLike, addComment } = usePosts();

  useEffect(() => {
    fetchPosts({ page: 1, reset: true }).catch((error) => toast.error(error));
  }, [fetchPosts]);

  const loadMore = useCallback(() => {
    if (!loading && pagination.hasMore) {
      fetchPosts({ page: pagination.page + 1 }).catch((error) => toast.error(error));
    }
  }, [fetchPosts, loading, pagination.hasMore, pagination.page]);

  useInfiniteScroll(sentinelRef, loadMore, pagination.hasMore);

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar src={user?.avatar}>{user?.username?.[0]}</Avatar>
          <Typography variant="h6">Hi, {user?.username}</Typography>
        </Stack>
        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Stack>

      <Stack spacing={2}>
        <CreatePostCard user={user} onCreate={createPost} />
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUserId={user?._id}
            onLike={toggleLike}
            onComment={addComment}
          />
        ))}
        {!loading && posts.length === 0 && (
          <EmptyState title="No posts yet" description="Create the first post to start the feed." />
        )}
        {loading && <FeedSkeleton />}
        <Box ref={sentinelRef} height={10} />
      </Stack>
    </Container>
  );
};
