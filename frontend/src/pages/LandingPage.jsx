import { Box, Container, Stack, Typography, IconButton, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "../components/landing/HeroSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../styles/landing.css";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#09090b" }}>
      
      {/* Elite Floating Pill Navigation */}
      <Box className="elite-navbar-container fade-in-up">
        <Box className="elite-navbar-pill">
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-1px", color: "#ffffff", mr: 4 }}>
            Opus.
          </Typography>
          
          <Stack direction="row" spacing={1} alignItems="center" display={{ xs: "none", md: "flex" }}>
            <Box className="elite-nav-link">Features</Box>
            <Box className="elite-nav-link">Customers</Box>
            <Box className="elite-nav-link">Pricing</Box>
          </Stack>
          
          <Box sx={{ ml: "auto", pl: 2 }}>
            <Button 
              onClick={() => navigate("/login")}
              sx={{ 
                color: "#000", 
                textTransform: "none", 
                fontWeight: 600,
                fontSize: "0.9rem",
                backgroundColor: "#fff",
                borderRadius: "100px",
                px: 3,
                py: 1,
                boxShadow: "0 4px 14px rgba(255, 255, 255, 0.25)",
                "&:hover": { backgroundColor: "#f4f4f5", transform: "translateY(-1px)", boxShadow: "0 6px 20px rgba(255, 255, 255, 0.3)" },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>

      <Box component="main">
        <HeroSection />
        <FeaturesSection />
      </Box>

      {/* Ultra-modern Footer */}
      <Box component="footer" sx={{ backgroundColor: "#09090b", color: "#fafafa", pt: 12, pb: 8, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={6} mb={10}>
            <Box maxWidth={300}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, letterSpacing: "-1px", color: "#ffffff" }}>
                Opus.
              </Typography>
              <Typography variant="body2" sx={{ color: "#a1a1aa", lineHeight: 1.7 }}>
                The professional standard for modern networking. Designed for those who demand excellence in every interaction.
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={{ xs: 6, sm: 10 }}>
              <Stack spacing={2.5}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#ffffff" }}>Platform</Typography>
                <Typography variant="body2" sx={{ color: "#a1a1aa", cursor: "pointer", "&:hover": { color: "#fff" } }}>Features</Typography>
                <Typography variant="body2" sx={{ color: "#a1a1aa", cursor: "pointer", "&:hover": { color: "#fff" } }}>Security</Typography>
                <Typography variant="body2" sx={{ color: "#a1a1aa", cursor: "pointer", "&:hover": { color: "#fff" } }}>Enterprise</Typography>
              </Stack>
              <Stack spacing={2.5}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#ffffff" }}>Company</Typography>
                <Typography variant="body2" sx={{ color: "#a1a1aa", cursor: "pointer", "&:hover": { color: "#fff" } }}>About Opus</Typography>
                <Typography variant="body2" sx={{ color: "#a1a1aa", cursor: "pointer", "&:hover": { color: "#fff" } }}>Careers</Typography>
                <Typography variant="body2" sx={{ color: "#a1a1aa", cursor: "pointer", "&:hover": { color: "#fff" } }}>Contact</Typography>
              </Stack>
            </Stack>
          </Stack>
          
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />
          
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="body2" sx={{ color: "#52525b" }}>
              &copy; {new Date().getFullYear()} Opus Inc. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: "#a1a1aa", "&:hover": { color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#a1a1aa", "&:hover": { color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}>
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#a1a1aa", "&:hover": { color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}>
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

    </Box>
  );
};
