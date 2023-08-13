import { useState } from "react";
import './user.css';
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = () => {
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

    if (username.length < 3) {
      setUsernameError("User");
    }
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email format");
    }
    if (!password.match(passwordRegex)) {
      setPasswordError("Password must be min");
    }
    if (username.length >= 3 && email.match(emailRegex) && password.match(passwordRegex)) {
      // API call to register user
      alert("Registration successful!");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="user-icon">
      </div>
      <h1>Register</h1>
      <div className="input-container">
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!usernameError}
          helperText={usernameError}
          fullWidth
        />
      </div>
      <div className="input-container">
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          fullWidth
        />
      </div>
      <div className="input-container">
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
      <Button variant="contained" className="login-button" onClick={handleRegister}>
        Register
      </Button>
      
      <div className="register-link">
        <p>Already have an account? <a href="#">Log In</a></p>
      </div>
    </div>
  );
};

export default Register;
