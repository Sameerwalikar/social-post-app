import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { BRAND_NAME } from "../../constants/brand";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box className="hero-background" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", pt: 10, pb: 12 }}>
      <Container maxWidth="lg" className="hero-content">
        <Stack spacing={4} alignItems="center" textAlign="center" sx={{ maxWidth: 860, mx: "auto" }}>

          {/* <Box className="fade-in-up" sx={{ 
            display: "inline-block", 
            px: 2, 
            py: 0.5, 
            borderRadius: "24px", 
            backgroundColor: "rgba(255, 255, 255, 0.05)", 
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#a1a1aa", 
            fontWeight: 500, 
            fontSize: "0.875rem", 
            letterSpacing: 0.5, 
            mb: 1 
          }}>
            {BRAND_NAME} v2.0 is now available
          </Box> */}

          <Typography
            variant="h1"
            className="fade-in-up delay-100"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "3.5rem", sm: "5rem", md: "6.5rem" },
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#ffffff"
            }}
          >
            The new standard for <span style={{ color: "#3b82f6" }}>connection.</span>
          </Typography>

          <Typography
            variant="h5"
            className="fade-in-up delay-200"
            sx={{
              fontWeight: 400,
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
              color: "#a1a1aa",
              fontSize: { xs: "1.1rem", md: "1.25rem" }
            }}
          >
            {BRAND_NAME} is the enterprise-grade social platform designed for elite professionals. Engineered for speed, security, and unparalleled aesthetic excellence.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2.5}
            pt={4}
            className="fade-in-up delay-300"
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <Button
              className="premium-button-primary"
              onClick={() => navigate("/register")}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                borderRadius: "100px",
                px: 5,
                py: 1.8,
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: 600
              }}
            >
              Start for free
            </Button>

            <Button
              className="premium-button-secondary"
              onClick={() => navigate("/login")}
              sx={{
                borderRadius: "100px",
                px: 5,
                py: 1.8,
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Sign In
            </Button>
          </Stack>

        </Stack>
      </Container>
    </Box>
  );
};
