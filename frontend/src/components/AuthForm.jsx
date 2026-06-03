import { useState } from "react";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";

export const AuthForm = ({ mode, onSubmit, loading }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (key) => (event) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await onSubmit(values);
    } catch (message) {
      setError(message);
    }
  };

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit} sx={{ width: "100%" }}>
      {error && (
        <Box 
          className="fade-in-up"
          sx={{ 
            backgroundColor: "rgba(239, 68, 68, 0.1)", 
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "12px",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5
          }}
        >
          <Typography variant="body2" sx={{ color: "#ef4444", fontWeight: 500 }}>
            ⚠ {error}
          </Typography>
        </Box>
      )}
      
      {mode === "register" && (
        <Box className="elite-input-container">
          <input 
            type="text" 
            className="elite-input" 
            value={values.username} 
            onChange={handleChange("username")} 
            required 
            placeholder=" "
            id="username-input"
          />
          <label htmlFor="username-input" className="elite-label">Username</label>
        </Box>
      )}
      
      <Box className="elite-input-container">
        <input 
          type="email" 
          className="elite-input" 
          value={values.email} 
          onChange={handleChange("email")} 
          required 
          placeholder=" "
          id="email-input"
        />
        <label htmlFor="email-input" className="elite-label">Email address</label>
      </Box>

      <Box className="elite-input-container">
        <input 
          type="password" 
          className="elite-input" 
          value={values.password} 
          onChange={handleChange("password")} 
          required 
          placeholder=" "
          id="password-input"
        />
        <label htmlFor="password-input" className="elite-label">Password</label>
      </Box>

      <button type="submit" className="elite-button" disabled={loading} style={{ marginTop: "32px" }}>
        {loading ? (
          <CircularProgress size={24} sx={{ color: "inherit" }} />
        ) : (
          mode === "register" ? "Continue" : "Sign in"
        )}
      </button>
    </Stack>
  );
};
