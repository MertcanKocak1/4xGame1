import { useContext, useState } from "react";
import './user.css'; 
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RootStoreContext } from "../../helpers/stores/RootStore";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Login = () => {
  const history = useHistory();
  const rootStore = useContext(RootStoreContext);
  const {userStore} = rootStore;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try{
      await userStore.login({UserName: username, PasswordHash: password });
      if (userStore.error) {
        setError("Username or Password Wrong."); 
      }
      else{
        history.push("/configuration");
      }
    }catch (err) {
      alert("Unexpected Error.");
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
      <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
    </div>
  );
};

export default observer(Login);
