import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CommentModal } from "./CommentModal";
import { resolveMediaUrl } from "../utils/media";

dayjs.extend(relativeTime);

const imageUrl = (src) =>
  src ? `${(import.meta.env.VITE_SERVER_URL || "http://localhost:5000").replace(/\/$/, "")}${src}` : "";

const extractTitle = (text) => {
  if (!text?.trim()) return null;
  const firstLine = text.trim().split("\n")[0];
  return firstLine;
};

const extractBody = (text) => {
  if (!text?.trim()) return "";
  const lines = text.trim().split("\n");
  if (lines.length <= 1) {
    const title = lines[0];
    return title.length > 120 ? title.slice(120) : "";
  }
  return lines.slice(1).join("\n");
};

const extractUrl = (text) => {
  const match = text?.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : null;
};

export const PostCard = ({ post, currentUserId, onLike, onComment }) => {
  const [openComments, setOpenComments] = useState(false);
  const [following, setFollowing] = useState(false);
  const liked = post.likes.some((like) => like.userId === currentUserId);
  const score = post.likes.length;

  const title = extractTitle(post.text);
  const body = extractBody(post.text);
  const link = extractUrl(post.text);
  const showTitleAsHeadline = title && (body || post.image || link);

  return (
    <>
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Post header */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.25}>
            <Stack direction="row" spacing={1} alignItems="center" minWidth={0}>
              <Avatar
                src={resolveMediaUrl(post.user?.avatar)}
                sx={{ width: 32, height: 32 }}
              >
                {post.user?.username?.[0]}
              </Avatar>
              <Box minWidth={0}>
                <Typography variant="body2" fontWeight={600} noWrap>
                  u/{post.user?.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {dayjs(post.createdAt).fromNow()}
                </Typography>
              </Box>
            </Stack>
            <Button
              size="small"
              variant={following ? "outlined" : "contained"}
              onClick={() => setFollowing(!following)}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: 13,
                minWidth: 88,
                boxShadow: "none",
                flexShrink: 0,
                "&:hover": { boxShadow: "none" },
              }}
            >
              {following ? "Following" : "Follow +"}
            </Button>
          </Stack>

          {/* Title & content row */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {showTitleAsHeadline ? (
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ color: "text.primary", lineHeight: 1.35, mb: link || body ? 0.5 : 0 }}
                >
                  {title}
                </Typography>
              ) : (
                post.text && (
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{ color: "text.primary", lineHeight: 1.35, mb: 0.5 }}
                  >
                    {post.text.length > 200 ? `${post.text.slice(0, 200)}…` : post.text}
                  </Typography>
                )
              )}

              {link && (
                <Typography
                  component="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{
                    color: "#0079d3",
                    display: "block",
                    mb: body ? 0.75 : 0,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                    wordBreak: "break-all",
                  }}
                >
                  {link}
                </Typography>
              )}

              {body && (
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  {body}
                </Typography>
              )}

              {!post.image && !showTitleAsHeadline && !post.text && (
                <Typography variant="body2" color="text.secondary">
                  Shared an image
                </Typography>
              )}
            </Box>

            {post.image && (
              <Box
                component="img"
                src={imageUrl(post.image)}
                alt="Post"
                sx={{
                  width: { xs: 96, sm: 140 },
                  height: { xs: 72, sm: 100 },
                  objectFit: "cover",
                  borderRadius: 1,
                  flexShrink: 0,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
            )}
          </Box>

          {/* Engagement bar */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1.5}
            pt={1}
            sx={{ borderTop: "1px solid", borderColor: "divider" }}
          >
            <Stack direction="row" alignItems="center" spacing={0}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "action.hover",
                  borderRadius: "999px",
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => onLike(post._id)}
                  sx={{
                    borderRadius: 0,
                    color: liked ? "#ff4500" : "text.secondary",
                    "&:hover": { bgcolor: "action.selected" },
                  }}
                >
                  <ArrowUpwardIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    px: 0.5,
                    minWidth: 24,
                    textAlign: "center",
                    color: liked ? "#ff4500" : "text.primary",
                    fontSize: 13,
                  }}
                >
                  {score}
                </Typography>
                <IconButton
                  size="small"
                  sx={{ borderRadius: 0, color: "text.secondary", "&:hover": { bgcolor: "action.selected" } }}
                >
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
              </Box>

              <Button
                startIcon={<ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />}
                onClick={() => setOpenComments(true)}
                sx={{
                  ml: 1,
                  textTransform: "none",
                  color: "text.secondary",
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: "999px",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                {post.comments.length}
              </Button>

              <Button
                startIcon={<ShareOutlinedIcon sx={{ fontSize: 18 }} />}
                sx={{
                  textTransform: "none",
                  color: "text.secondary",
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: "999px",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                Share
              </Button>
            </Stack>

            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <OutlinedFlagIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Card>

      <CommentModal
        open={openComments}
        onClose={() => setOpenComments(false)}
        post={post}
        onSubmit={onComment}
      />
    </>
  );
};
