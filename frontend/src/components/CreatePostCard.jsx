import { useState } from "react";
import { Avatar, Box, Button, Card, CardContent, Stack, TextField } from "@mui/material";
import toast from "react-hot-toast";

export const CreatePostCard = ({ user, onCreate }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

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
      setText("");
      setImage(null);
      setPreview("");
      toast.success("Post published");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent component="form" onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2}>
          <Avatar src={user?.avatar}>{user?.username?.[0]}</Avatar>
          <TextField
            fullWidth
            multiline
            minRows={2}
            placeholder="Share what’s happening..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </Stack>
        {preview && (
          <Box mt={2}>
            <img src={preview} alt="Preview" style={{ width: "100%", borderRadius: 10 }} />
          </Box>
        )}
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button component="label" variant="outlined">
            Upload image
            <input hidden type="file" accept="image/*" onChange={handleFile} />
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
