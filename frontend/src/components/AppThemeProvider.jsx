import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useThemeMode } from "../context/ThemeModeContext";
import { getTheme } from "../styles/theme";

export const AppThemeProvider = ({ children }) => {
  const { mode } = useThemeMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
