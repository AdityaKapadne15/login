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

  useEffect(() => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (form.firstname && form.firstname.trim() === "") newErrors.firstname = "First name is required.";
    if (form.lastname && form.lastname.trim() === "") newErrors.lastname = "Last name is required.";
    if (form.username && form.username.trim() === "") newErrors.username = "Username is required.";
    if (form.email && !emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
    if (form.phone && !phoneRegex.test(form.phone)) newErrors.phone = "Phone number must be 10 digits.";
    if (form.password && !passwordRegex.test(form.password))
      newErrors.password = "Password must be at least 8 characters, contain an uppercase letter, a number, and a symbol.";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    setValid(Object.keys(newErrors).length === 0);
  }, [form]);

  const handleSignup = () => {
    if (!valid) {
      alert("Please correct the errors before submitting.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ ...form, password: undefined });
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
            fullWidth margin="normal"
            value={form.firstname}
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            error={form.firstname !== "" && !!errors.firstname}
            helperText={form.firstname !== "" && errors.firstname ? errors.firstname : ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="First Name"
          />

          {/** Last Name */}
          <TextField 
            fullWidth margin="normal"
            value={form.lastname}
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            error={form.lastname !== "" && !!errors.lastname}
            helperText={form.lastname !== "" && errors.lastname ? errors.lastname : ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Last Name"
          />

          {/** Username */}
          <TextField 
            fullWidth margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            error={form.username !== "" && !!errors.username}
            helperText={form.username !== "" && errors.username ? errors.username : ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Username"
          />

          {/** Email */}
          <TextField 
            fullWidth margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={form.email !== "" && !!errors.email}
            helperText={form.email !== "" && errors.email ? errors.email : ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Email"
          />

          {/** Phone */}
          <TextField 
            fullWidth margin="normal"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            error={form.phone !== "" && !!errors.phone}
            helperText={form.phone !== "" && errors.phone ? errors.phone : ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Phone Number"
          />

          {/** Password */}
          <TextField 
            type="password"
            fullWidth margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={form.password !== "" && !!errors.password}
            helperText={form.password !== "" && errors.password ? errors.password : ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Password"
          />

          {/** Confirm Password */}
          <TextField 
            type="password"
            fullWidth margin="normal"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            error={form.confirmPassword !== "" && !!errors.confirmPassword}
            helperText={form.confirmPassword !== "" && errors.confirmPassword ? errors.confirmPassword : ""}
            sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: '#4a47a3' } }}
            placeholder="Confirm Password"
          />

          {/** Error Alert */}
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fix the errors above.
            </Alert>
          )}

          {/** Submit Button */}
          <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleSignup} disabled={!valid}>
            Signup
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
