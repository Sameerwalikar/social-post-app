import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { AuthLayout } from "../layouts/AuthLayout";
import { authService } from "../services/authService";

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const response = await authService.register({ username, email, password });
      login(response.data);
      toast.success("Account provisioned successfully", { 
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      navigate("/feed", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create an account" subtitle="Join Opus to continue.">
      <AuthForm mode="register" onSubmit={handleSubmit} loading={loading} />
      <Box mt={4} textAlign="center">
        <Typography variant="body2" sx={{ color: "#a1a1aa" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ffffff", textDecoration: "none", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.3)", transition: "all 0.2s" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};
