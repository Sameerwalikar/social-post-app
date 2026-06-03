import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { resolveMediaUrl } from "../../utils/media";

const SlothLogo = () => (
  <Box
    component="span"
    sx={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      bgcolor: "#7c3aed",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      flexShrink: 0,
    }}
  >
    🦥
  </Box>
);

export const TopNavbar = ({ user, onCreateClick, onLogout, searchQuery, onSearchChange }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <header className="feed-topnav">
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", minWidth: 120 }}
        onClick={() => navigate("/feed")}
      >
        <SlothLogo />
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "#1a1a1b", letterSpacing: "-0.02em", fontSize: "1.25rem" }}
        >
          slothit
        </Typography>
      </Box>

      <TextField
        className="feed-topnav-search"
        placeholder="Search slothit"
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          flex: 1,
          maxWidth: 560,
          mx: "auto",
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
            bgcolor: "#f6f7f8",
            "& fieldset": { borderColor: "#edeff1" },
            "&:hover fieldset": { borderColor: "#ccc" },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#878a8c", fontSize: 22 }} />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: "auto" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateClick}
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 700,
            px: 2,
            py: 0.75,
            boxShadow: "none",
            "&:hover": { boxShadow: "none", bgcolor: "#6d28d9" },
          }}
        >
          Create
        </Button>
        <IconButton size="medium" sx={{ color: "#1a1a1b" }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton size="medium" sx={{ color: "#1a1a1b" }}>
          <NotificationsNoneIcon />
        </IconButton>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5, ml: 0.5 }}>
          <Avatar
            src={resolveMediaUrl(user?.avatar)}
            sx={{ width: 32, height: 32, border: "2px solid #edeff1" }}
          >
            {user?.username?.[0]?.toUpperCase()}
          </Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              navigate("/profile");
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </header>
  );
};
