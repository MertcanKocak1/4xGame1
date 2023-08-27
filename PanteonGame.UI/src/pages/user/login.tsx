import React, { useContext, useState } from "react";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useHistory, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../helpers/stores/RootStore";
import './user.css'; 

const Login = () => {
  const { userStore } = useContext(RootStoreContext);
  const history = useHistory();

  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await userStore.login({ UserName: username, PasswordHash: password });
      
      if (userStore.error) {
        setError("Username or Password Wrong.");
        userStore.clearError();
      } else {
        history.push("/configuration");
      }
    } catch {
      alert("Unexpected Error.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <div className="input-container">
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={Boolean(error)}
          fullWidth
        />
      </div>

      <div className="input-container">
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={Boolean(error)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(prev => !prev)}>
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
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default observer(Login);
