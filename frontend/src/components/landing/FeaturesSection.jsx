import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import DynamicFeedRoundedIcon from "@mui/icons-material/DynamicFeedRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import DataUsageRoundedIcon from "@mui/icons-material/DataUsageRounded";

const features = [
  {
    icon: <SpeedRoundedIcon sx={{ fontSize: 32 }} />,
    title: "Zero Latency",
    description: "Built on a global edge network. Experience instant interactions and seamless transitions that feel native."
  },
  {
    icon: <SecurityRoundedIcon sx={{ fontSize: 32 }} />,
    title: "Enterprise Security",
    description: "Military-grade encryption for all communications. Your data never leaves our zero-trust architecture."
  },
  {
    icon: <DynamicFeedRoundedIcon sx={{ fontSize: 32 }} />,
    title: "Intelligent Feed",
    description: "Our proprietary algorithm delivers the most relevant content dynamically, adapting to your professional needs."
  },
  {
    icon: <DataUsageRoundedIcon sx={{ fontSize: 32 }} />,
    title: "Advanced Analytics",
    description: "Gain deep insights into your network engagement with our comprehensive, real-time analytics suite."
  }
];

export const FeaturesSection = () => {
  return (
    <Box sx={{ py: 16, backgroundColor: "#09090b", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={10} className="fade-in-up">
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2.5, fontSize: { xs: "2.5rem", md: "4rem" }, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Uncompromising <span className="opus-gradient-text">Performance</span>
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, maxWidth: 640, mx: "auto", color: "#a1a1aa", lineHeight: 1.6 }}>
            Opus sets a new benchmark for what a professional platform should be. Meticulously engineered from the ground up.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box 
                className="glassmorphic-card fade-in-up" 
                sx={{ 
                  p: 5, 
                  height: "100%", 
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  animationDelay: `${index * 150}ms`
                }}
              >
                <Box 
                  sx={{ 
                    p: 2, 
                    borderRadius: "16px", 
                    backgroundColor: "rgba(255, 255, 255, 0.05)", 
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    mb: 3.5
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#ffffff", letterSpacing: "-0.02em" }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, color: "#a1a1aa", fontSize: "1.1rem" }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
