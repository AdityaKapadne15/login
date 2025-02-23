//Login.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Card, CardContent } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/landing");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs" sx={"padding-top: 5rem"}> 
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Login</Typography>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
            Login
          </Button>
          <Button variant="outlined" fullWidth onClick={() => navigate("/signup")} sx={{ mt: 1 }}>
            Register
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
