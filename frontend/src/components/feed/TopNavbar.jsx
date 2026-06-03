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
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useNavigate } from "react-router-dom";
import { BrandLogo } from "../BrandLogo";
import { BRAND_NAME } from "../../constants/brand";
import { useThemeMode } from "../../context/ThemeModeContext";
import { resolveMediaUrl } from "../../utils/media";

export const TopNavbar = ({ user, onCreateClick, onLogout, searchQuery, onSearchChange, isDark }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggleMode } = useThemeMode();

  return (
    <header className="feed-topnav">
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", minWidth: 140 }}
        onClick={() => navigate("/feed")}
      >
        <BrandLogo size={32} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.02em", fontSize: "1.25rem" }}
        >
          {BRAND_NAME}
        </Typography>
      </Box>

      <TextField
        className="feed-topnav-search"
        placeholder={`Search ${BRAND_NAME}`}
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          flex: 1,
          maxWidth: 560,
          mx: "auto",
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
            bgcolor: isDark ? "#272729" : "#f6f7f8",
            "& fieldset": { borderColor: isDark ? "#343536" : "#edeff1" },
            "&:hover fieldset": { borderColor: isDark ? "#4a4b4d" : "#ccc" },
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
        <IconButton
          size="medium"
          onClick={toggleMode}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          sx={{ color: "text.primary" }}
        >
          {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
        <IconButton size="medium" sx={{ color: "text.primary" }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton size="medium" sx={{ color: "text.primary" }}>
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
