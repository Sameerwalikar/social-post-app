import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import toast from "react-hot-toast";
import { CreatePostDialog } from "../components/feed/CreatePostDialog";
import { LeftSidebar } from "../components/feed/LeftSidebar";
import { RightSidebar } from "../components/feed/RightSidebar";
import { TopNavbar } from "../components/feed/TopNavbar";
import { EmptyState } from "../components/EmptyState";
import { FeedSkeleton } from "../components/FeedSkeleton";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../hooks/useAuth";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { usePosts } from "../hooks/usePosts";
import "../styles/feed.css";

export const FeedPage = () => {
  const sentinelRef = useRef(null);
  const { user, logout } = useAuth();
  const { posts, loading, pagination, fetchPosts, createPost, toggleLike, addComment } = usePosts();
  const [createOpen, setCreateOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentHidden, setRecentHidden] = useState(false);

  useEffect(() => {
    fetchPosts({ page: 1, reset: true }).catch((error) => toast.error(error));
  }, [fetchPosts]);

  const loadMore = useCallback(() => {
    if (!loading && pagination.hasMore) {
      fetchPosts({ page: pagination.page + 1 }).catch((error) => toast.error(error));
    }
  }, [fetchPosts, loading, pagination.hasMore, pagination.page]);

  useInfiniteScroll(sentinelRef, loadMore, pagination.hasMore);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.text?.toLowerCase().includes(q) ||
        p.user?.username?.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  const recentPosts = recentHidden ? [] : filteredPosts;

  return (
    <div className="feed-shell">
      <TopNavbar
        user={user}
        onCreateClick={() => setCreateOpen(true)}
        onLogout={logout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="feed-body">
        <LeftSidebar activeNav={activeNav} onNavChange={setActiveNav} />

        <main className="feed-main">
          <Stack spacing={1.5}>
            {filteredPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                currentUserId={user?._id}
                onLike={toggleLike}
                onComment={addComment}
              />
            ))}
            {!loading && filteredPosts.length === 0 && (
              <EmptyState
                title={searchQuery ? "No matching posts" : "No posts yet"}
                description={
                  searchQuery
                    ? "Try a different search term."
                    : "Hit Create to publish the first post."
                }
              />
            )}
            {loading && <FeedSkeleton />}
            <Box ref={sentinelRef} height={10} />
          </Stack>
        </main>

        <RightSidebar posts={recentPosts} onClear={() => setRecentHidden(true)} />
      </div>

      <CreatePostDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        user={user}
        onCreate={createPost}
      />
    </div>
  );
};
