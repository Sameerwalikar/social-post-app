import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AppThemeProvider } from "./components/AppThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { ThemeModeProvider } from "./context/ThemeModeContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeModeProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <PostProvider>
              <App />
              <Toaster position="top-right" />
            </PostProvider>
          </AuthProvider>
        </BrowserRouter>
      </AppThemeProvider>
    </ThemeModeProvider>
  </StrictMode>
);
