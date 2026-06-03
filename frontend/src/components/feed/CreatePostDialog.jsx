import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { resolveMediaUrl } from "../../utils/media";

export const CreatePostDialog = ({ open, onClose, user, onCreate }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (!loading) {
      setText("");
      setImage(null);
      setPreview("");
      onClose();
    }
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim() && !image) {
      toast.error("Post must contain text, image, or both");
      return;
    }
    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);
    setLoading(true);
    try {
      await onCreate(formData);
      toast.success("Post published");
      handleClose();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        <Typography fontWeight={700}>Create a post</Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar src={resolveMediaUrl(user?.avatar)}>{user?.username?.[0]}</Avatar>
            <TextField
              fullWidth
              multiline
              minRows={4}
              placeholder="Title and body — share what's on your mind..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
            />
          </Stack>
          {preview && (
            <Box mt={2} ml={7}>
              <img src={preview} alt="Preview" style={{ width: "100%", borderRadius: 8, maxHeight: 280, objectFit: "cover" }} />
            </Box>
          )}
          <Stack direction="row" justifyContent="space-between" mt={3} pl={7}>
            <Button component="label" variant="outlined" sx={{ textTransform: "none", borderRadius: 2 }}>
              Add image
              <input hidden type="file" accept="image/*" onChange={handleFile} />
            </Button>
            <Button type="submit" variant="contained" disabled={loading} sx={{ textTransform: "none", borderRadius: 2, px: 3 }}>
              {loading ? "Posting…" : "Post"}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
