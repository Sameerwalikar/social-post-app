import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

export const CommentModal = ({ open, onClose, post, onSubmit }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await onSubmit(post._id, text.trim());
      setText("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Comments ({post.comments.length})</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mb={2}>
          {post.comments.map((comment) => (
            <Box key={`${comment.userId}-${comment.createdAt}`}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 28, height: 28 }}>{comment.username?.[0]}</Avatar>
                <Typography fontWeight={600}>{comment.username}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {dayjs(comment.createdAt).format("MMM D, HH:mm")}
                </Typography>
              </Stack>
              <Typography mt={0.5}>{comment.text}</Typography>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            placeholder="Write a comment..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Button onClick={handleAdd} disabled={loading} variant="contained">
            Send
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
