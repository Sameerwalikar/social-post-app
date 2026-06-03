import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { resolveMediaUrl } from "../../utils/media";

dayjs.extend(relativeTime);

const imageUrl = (src) =>
  src ? `${(import.meta.env.VITE_SERVER_URL || "http://localhost:5000").replace(/\/$/, "")}${src}` : "";

const extractTitle = (text) => {
  if (!text?.trim()) return "Image post";
  const firstLine = text.trim().split("\n")[0];
  return firstLine.length > 72 ? `${firstLine.slice(0, 72)}…` : firstLine;
};

const extractUrl = (text) => {
  const match = text?.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : null;
};

export const RightSidebar = ({ posts, onClear }) => {
  const recent = posts.slice(0, 5);

  return (
    <aside className="feed-sidebar-right">
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
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle2" fontWeight={700}>
              Recent Posts
            </Typography>
            <Button
              size="small"
              onClick={onClear}
              sx={{ textTransform: "none", fontWeight: 700, color: "#7c3aed", minWidth: "auto" }}
            >
              Clear
            </Button>
          </Box>

          {recent.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              No posts to show yet.
            </Typography>
          ) : (
            <Stack divider={<Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />}>
              {recent.map((post) => {
                const url = extractUrl(post.text);
                return (
                  <Box
                    key={post._id}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      p: 1.5,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" spacing={0.75} alignItems="center" mb={0.5}>
                        <Avatar
                          src={resolveMediaUrl(post.user?.avatar)}
                          sx={{ width: 20, height: 20, fontSize: 10 }}
                        >
                          {post.user?.username?.[0]}
                        </Avatar>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          u/{post.user?.username}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.3, mb: 0.25 }} noWrap>
                        {extractTitle(post.text)}
                      </Typography>
                      {url && (
                        <Typography
                          variant="caption"
                          sx={{ color: "#0079d3", display: "block" }}
                          noWrap
                        >
                          {url}
                        </Typography>
                      )}
                    </Box>
                    {post.image && (
                      <Box
                        component="img"
                        src={imageUrl(post.image)}
                        alt=""
                        sx={{
                          width: 72,
                          height: 56,
                          objectFit: "cover",
                          borderRadius: 1,
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Stack>
          )}
        </CardContent>
      </Card>
    </aside>
  );
};
