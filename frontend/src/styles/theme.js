import { createTheme } from "@mui/material";

const shared = {
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
};

export const getTheme = (mode = "light") =>
  createTheme({
    ...shared,
    palette: {
      mode,
      primary: { main: "#7c3aed" },
      secondary: { main: "#ff5f7a" },
      ...(mode === "dark"
        ? {
            background: { default: "#0b0b0c", paper: "#1a1a1b" },
            text: { primary: "#d7dadc", secondary: "#818384" },
            divider: "#343536",
          }
        : {
            background: { default: "#f6f7f8", paper: "#ffffff" },
            text: { primary: "#1a1a1b", secondary: "#878a8c" },
            divider: "#edeff1",
          }),
    },
  });

export const theme = getTheme("light");
