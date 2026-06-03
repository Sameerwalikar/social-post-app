import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Container, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import { resolveMediaUrl } from "../utils/media";

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      setPreview(resolveMediaUrl(user?.avatar) || "");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file, user?.avatar]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] ?? null;
    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Choose a profile image to upload");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await authService.uploadAvatar(formData);
      updateUser(response.data.user);
      setFile(null);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" mb={1}>
            Profile Picture
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload a profile photo for your account.
          </Typography>
        </Box>

        <Stack alignItems="center" spacing={2}>
          <Avatar
            src={preview}
            sx={{ width: 120, height: 120, fontSize: 48 }}
          >
            {!preview && user?.username?.[0]}
          </Avatar>
          <Typography variant="h6">{user?.username}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleUpload} sx={{ display: "grid", gap: 2 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Uploading..." : "Upload profile picture"}
            </Button>
            <Button variant="outlined" onClick={() => navigate("/feed")}>Back to feed</Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
