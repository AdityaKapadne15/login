import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Card, CardContent, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (value.trim() === "") {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else {
      if (name === "email" && !emailRegex.test(value)) error = "Invalid email format.";
      if (name === "phone" && !phoneRegex.test(value)) error = "Phone number must be 10 digits.";
      if (name === "password" && !passwordRegex.test(value))
        error = "Password must be at least 8 characters, contain an uppercase letter, a number, and a symbol.";
      if (name === "Confirm Password do not match" && value !== form.password)
        error = "Passwords do not match.";
    }

    setErrors((prev) => {
      const updatedErrors = { ...prev, [name]: error };
      return updatedErrors;
    });
  };

  // ✅ Fix: Use useEffect to monitor errors and update `valid`
  useEffect(() => {
    setValid(Object.values(errors).every((err) => err === ""));
  }, [errors]);

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSignup = () => {
    if (!valid) {
      alert("Please correct the errors before submitting.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ 
      firstname: form.firstname,
      lastname: form.lastname,
      username: form.username,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Redirecting to login...");
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3 }}>
        <CardContent>
          <Typography variant="h5">Signup</Typography>

          {/** First Name */}
          <TextField 
            fullWidth
            margin="normal"
            name="firstname"
            value={form.firstname}
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            onBlur={handleBlur}
            error={!!errors.firstname}
            helperText={errors.firstname || ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="First Name"
          />

          {/** Last Name */}
          <TextField 
            fullWidth
            margin="normal"
            name="lastname"
            value={form.lastname}
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            onBlur={handleBlur}
            error={!!errors.lastname}
            helperText={errors.lastname || ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Last Name"
          />

          {/** Username */}
          <TextField 
            fullWidth
            margin="normal"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            onBlur={handleBlur}
            error={!!errors.username}
            helperText={errors.username || ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Username"
          />

          {/** Email */}
          <TextField 
            fullWidth
            margin="normal"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={handleBlur}
            error={!!errors.email}
            helperText={errors.email || ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Email"
          />

          {/** Phone */}
          <TextField 
            fullWidth
            margin="normal"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            onBlur={handleBlur}
            error={!!errors.phone}
            helperText={errors.phone || ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Phone Number"
          />

          {/** Password */}
          <TextField 
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onBlur={handleBlur}
            error={!!errors.password}
            helperText={errors.password || ""}
            autoComplete="new-password"
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Password"
          />

          {/** Confirm Password */}
          <TextField 
            type="password"
            fullWidth
            margin="normal"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            onBlur={handleBlur}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword || ""}
            autoComplete="new-password"
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Confirm Password"
          />

          {/** ✅ Fix: Error alert only appears if there are errors */}
          {Object.values(errors).some((err) => err) && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fix the errors above.
            </Alert>
          )}

          <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleSignup} disabled={!valid}>
            Signup
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
