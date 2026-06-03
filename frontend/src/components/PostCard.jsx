import { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import dayjs from "dayjs";
import { CommentModal } from "./CommentModal";
import { resolveMediaUrl } from "../utils/media";

const imageUrl = (src) =>
  src ? `${(import.meta.env.VITE_SERVER_URL || "http://localhost:5000").replace(/\/$/, "")}${src}` : "";

export const PostCard = ({ post, currentUserId, onLike, onComment }) => {
  const [openComments, setOpenComments] = useState(false);
  const liked = post.likes.some((like) => like.userId === currentUserId);

  return (
    <>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
            <Avatar src={resolveMediaUrl(post.user?.avatar)}>{post.user?.username?.[0]}</Avatar>
            <Stack>
              <Typography fontWeight={700}>{post.user?.username}</Typography>
              <Typography variant="caption" color="text.secondary">
                {dayjs(post.createdAt).format("MMM D, YYYY HH:mm")}
              </Typography>
            </Stack>
          </Stack>
          {post.text && <Typography mb={1.5}>{post.text}</Typography>}
          {post.image && <CardMedia component="img" image={imageUrl(post.image)} sx={{ borderRadius: 2 }} />}
          <Stack direction="row" spacing={2} mt={1}>
            <Button
              startIcon={
                <IconButton size="small">{liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}</IconButton>
              }
              onClick={() => onLike(post._id)}
            >
              {post.likes.length}
            </Button>
            <Button
              startIcon={
                <IconButton size="small">
                  <ChatBubbleOutlineIcon />
                </IconButton>
              }
              onClick={() => setOpenComments(true)}
            >
              {post.comments.length}
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <CommentModal open={openComments} onClose={() => setOpenComments(false)} post={post} onSubmit={onComment} />
    </>
  );
};
