import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#5b3df5" },
    secondary: { main: "#ff5f7a" },
    background: { default: "#f4f6fb", paper: "#ffffff" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)" },
      },
    },
  },
});
