import { useContext, useState } from "react";
import './user.css';
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import { RootStoreContext } from "../../helpers/stores/RootStore";
import { observer } from "mobx-react-lite";

const Register = () => {
  const rootStore = useContext(RootStoreContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState<string | null>("");
  const { register, error,clearError } = rootStore.userStore;
  const history = useHistory();
  const handleRegister = async () => {
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&#])[A-Za-z\d@$!%*?&#.]{8,}$/;

    if (username.length < 3) {
      setUsernameError("Username should be at least 5 character.");
    }
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email format");
    }
    if (!password.match(passwordRegex)) {
      setPasswordError("Password is not valid.");
    }
    if (username.length >= 3 && email.match(emailRegex) && password.match(passwordRegex)) {
      try {
        await register({ UserName : username, email, PasswordHash : password }); 
        if(error){
          setApiError(error); 
          clearError();
        }
        else {
        alert("Registration successful!");
        history.push("/login");}
      } catch (e) {
        setApiError(error); 
      }
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
      
      {apiError && <div className="error-message">{apiError}</div>}

      <div className="register-link">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default observer(Register);
