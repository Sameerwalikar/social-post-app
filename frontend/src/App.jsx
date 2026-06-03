import { Suspense, lazy } from "react";
import { CircularProgress, Stack } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";

const FeedPage = lazy(() => import("./pages/FeedPage").then((mod) => ({ default: mod.FeedPage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then((mod) => ({ default: mod.LoginPage })));
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage").then((mod) => ({ default: mod.RegisterPage }))
);
const LandingPage = lazy(() => import("./pages/LandingPage").then((mod) => ({ default: mod.LandingPage })));
const ProfilePage = lazy(() => import("./pages/ProfilePage").then((mod) => ({ default: mod.ProfilePage })));

function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Stack alignItems="center" justifyContent="center" minHeight="100vh">
            <CircularProgress />
          </Stack>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
