import { useState } from "react";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const navItemSx = {
  borderRadius: 2,
  py: 0.75,
  "&.Mui-selected": {
    bgcolor: "#f6f7f8",
    "& .MuiListItemText-primary": { fontWeight: 700, color: "#1a1a1b" },
  },
  "&:hover": { bgcolor: "#f6f7f8" },
};

const SectionHeading = ({ children, action }) => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1, py: 1, mt: 1 }}>
    <Typography variant="caption" sx={{ fontWeight: 700, color: "#878a8c", textTransform: "uppercase", letterSpacing: 0.5 }}>
      {children}
    </Typography>
    {action}
  </Box>
);

const CommunityIcon = ({ color, label }) => (
  <Box
    sx={{
      width: 24,
      height: 24,
      borderRadius: "50%",
      bgcolor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 700,
      color: "#fff",
      flexShrink: 0,
    }}
  >
    {label}
  </Box>
);

const RECENT_COMMUNITIES = [
  { name: "swordartonline", color: "#e11d48", letter: "S" },
  { name: "computerscience", color: "#2563eb", letter: "C" },
  { name: "linuxmasterrace", color: "#16a34a", letter: "L" },
];

export const LeftSidebar = ({ activeNav = "home", onNavChange }) => {
  const [modOpen, setModOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(true);

  const mainNav = [
    { id: "home", label: "Home", icon: <HomeOutlinedIcon fontSize="small" /> },
    { id: "popular", label: "Popular", icon: <TrendingUpIcon fontSize="small" /> },
    { id: "all", label: "All", icon: <GroupsOutlinedIcon fontSize="small" /> },
  ];

  const modNav = [
    { id: "mod-mail", label: "Mod Mail", icon: <MailOutlineIcon fontSize="small" /> },
    { id: "mod-queue", label: "Mod Queue", icon: <FlagOutlinedIcon fontSize="small" /> },
    { id: "mod", label: "u/Mod", icon: <ShieldOutlinedIcon fontSize="small" /> },
  ];

  return (
    <aside className="feed-sidebar-left">
      <List dense disablePadding>
        {mainNav.map((item) => (
          <ListItemButton
            key={item.id}
            selected={activeNav === item.id}
            onClick={() => onNavChange?.(item.id)}
            sx={navItemSx}
          >
            <ListItemIcon sx={{ minWidth: 36, color: "#1a1a1b" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
          </ListItemButton>
        ))}
      </List>

      <SectionHeading
        action={
          <Box component="button" onClick={() => setModOpen(!modOpen)} sx={{ border: 0, bgcolor: "transparent", cursor: "pointer", p: 0, display: "flex" }}>
            {modOpen ? <ExpandLessIcon sx={{ fontSize: 18, color: "#878a8c" }} /> : <ExpandMoreIcon sx={{ fontSize: 18, color: "#878a8c" }} />}
          </Box>
        }
      >
        Moderation
      </SectionHeading>
      <Collapse in={modOpen}>
        <List dense disablePadding>
          {modNav.map((item) => (
            <ListItemButton key={item.id} sx={navItemSx} onClick={() => onNavChange?.(item.id)}>
              <ListItemIcon sx={{ minWidth: 36, color: "#1a1a1b" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <SectionHeading
        action={
          <Box component="button" onClick={() => setRecentOpen(!recentOpen)} sx={{ border: 0, bgcolor: "transparent", cursor: "pointer", p: 0, display: "flex" }}>
            {recentOpen ? <ExpandLessIcon sx={{ fontSize: 18, color: "#878a8c" }} /> : <ExpandMoreIcon sx={{ fontSize: 18, color: "#878a8c" }} />}
          </Box>
        }
      >
        Recent
      </SectionHeading>
      <Collapse in={recentOpen}>
        <List dense disablePadding>
          {RECENT_COMMUNITIES.map((c) => (
            <ListItemButton key={c.name} sx={navItemSx}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CommunityIcon color={c.color} label={c.letter} />
              </ListItemIcon>
              <ListItemText primary={`u/${c.name}`} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </aside>
  );
};
