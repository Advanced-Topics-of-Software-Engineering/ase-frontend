import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import "./Login.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import url from "../../API";

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [error, setError] = useState();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${url.auth}/api/auth/signin`, {
        username: inputs.username,
        password: inputs.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
          setRedirect(true);
        }
      })
      .catch((error) => {
        setError(error.toJSON().message);
        setIsOpenAlert(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <div class="login-background">
          <div class="bg"></div>
          {redirect && <Navigate to="/home" />}
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={400}
            alignItems="center"
            justifyContent={"center"}
            margin={"auto"}
            padding={10}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            backgroundColor="#fcfceb"
            sx={{
              ":hover:": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Typography
              marginBottom={"30px"}
              variant="h2"
              color="#660090"
              textAlign="center"
            >
              Login
            </Typography>
            <TextField
              fullWidth
              required
              onChange={handleChange}
              name="username"
              value={inputs.username}
              margin="normal"
              type={"text"}
              variant="outlined"
              label="username"
              InputProps={{
                classes: {
                  notchedOutline: "input-border",
                },
              }}
              InputLabelProps={{
                classes: {
                  root: "inputLabel",
                  focused: "inputLabel",
                },
              }}
            />
            <TextField
              fullWidth
              required
              onChange={handleChange}
              name="password"
              value={inputs.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffRoundedIcon />
                      ) : (
                        <VisibilityRoundedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                classes: {
                  notchedOutline: "input-border",
                },
              }}
              InputLabelProps={{
                classes: {
                  root: "inputLabel",
                  focused: "inputLabel",
                },
              }}
              sx={{
                ".MuiSvgIcon-root ": {
                  fill: "#660090",
                },
              }}
              margin="normal"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              label="password"
            />
            <Button
              type="submit"
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="primary"
              style={{
                height: "40px",
                width: "140px",
                marginTop: "50px",
              }}
            >
              Login
            </Button>
            {isOpenAlert && (
              <Snackbar
                open={isOpenAlert}
                autoHideDuration={1000}
                onClose={() => {
                  setIsOpenAlert(null);
                }}
              >
                <Alert
                  onClose={() => {
                    setIsOpenAlert(null);
                  }}
                  severity={"error"}
                  sx={{ width: "100%" }}
                >
                  {error}
                </Alert>
              </Snackbar>
            )}
          </Box>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Login;
