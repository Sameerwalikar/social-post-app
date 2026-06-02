import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { AuthLayout } from "../layouts/AuthLayout";
import { authService } from "../services/authService";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      login(response.data);
      toast.success("Authentication successful", { 
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      navigate(location.state?.from || "/feed", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your details to sign in.">
      <AuthForm mode="login" onSubmit={handleSubmit} loading={loading} />
      <Box mt={4} textAlign="center">
        <Typography variant="body2" sx={{ color: "#a1a1aa" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#ffffff", textDecoration: "none", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.3)", transition: "all 0.2s" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};
