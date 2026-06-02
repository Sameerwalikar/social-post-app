import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/landing.css"; 

export const AuthLayout = ({ title, subtitle, children }) => (
  <Box className="auth-background" sx={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", p: 2 }}>
    
    {/* Animated Background Elements */}
    <Box className="auth-grid" />
    <Box className="auth-glow-1" />
    <Box className="auth-glow-2" />

    {/* Elite Glass Card */}
    <Box 
      className="elite-glass-card fade-in-up"
      sx={{ 
        width: "100%", 
        maxWidth: 440, 
        p: { xs: 4, sm: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Box sx={{ mb: 6, textAlign: "center", width: "100%" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "-1px", color: "#ffffff", mb: 4, display: "inline-block" }}>
            Opus.
          </Typography>
        </Link>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5, color: "#ffffff", letterSpacing: "-0.03em" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#a1a1aa", fontSize: "0.95rem" }}>
          {subtitle}
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        {children}
      </Box>
      
    </Box>
  </Box>
);
