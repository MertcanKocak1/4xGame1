import React, { useContext, useState } from "react";
import './user.css'; 
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RootStoreContext } from "../../helpers/stores/RootStore";

const Login = () => {
  const rootStore = useContext(RootStoreContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = () => {
    if (username === "user" && password === "password") {
      // Successful login
      setError("");
      alert("Successful login!");
    } else {
      // Failed login
      setError("Username or password is wrong");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="user-icon">
      </div>
      <h1>Login</h1>
      <div className="input-container">
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
        />
      </div>
      <div className="input-container">
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
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
      <Button variant="contained" className="login-button" onClick={handleLogin}>
        Sign In
      </Button>
      {error && <div className="error">{error}</div>}
      
      <div className="register-link">
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
