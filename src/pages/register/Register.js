import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import "./Register.css";
import Header from "../Header";
import axios from "axios";
import url from "../../API";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [error, setError] = useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${url.auth}/api/auth/signup`,
        {
          username: inputs.username,
          email: inputs.email,
          userType: userType,
          password: inputs.password,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZ2VoYW5fdGVzdCIsImlhdCI6MTY3NTUwNjIxOSwiZXhwIjoxNjc1NTkyNjE5fQ.6qnpQkgn2V5KaEQYCqkti8A176wLnD_V7DgAhehxflg",
          },
        }
      )
      .then((response) => {
        setError("");
        setIsOpenAlert(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setIsOpenAlert(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <Header />
        <div class="register-background">
          <div class="bg"></div>
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={400}
            alignItems="center"
            justifyContent={"center"}
            margin={"auto"}
            padding={5}
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
              marginBottom={"20px"}
              variant="title"
              color="#660090"
              textAlign="center"
            >
              Create new account
            </Typography>
            <TextField
              fullWidth
              required
              onChange={handleChange}
              name="email"
              value={inputs.email}
              margin="normal"
              type={"email"}
              variant="outlined"
              label="email"
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
            <FormControl fullWidth required margin="normal" variant="outlined">
              <InputLabel style={{ color: "#660090" }}>user type</InputLabel>
              <Select
                variant="outlined"
                value={userType}
                onChange={handleUserTypeChange}
                label="user type"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#660090",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#660090",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#660090",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#660090",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "#660090",
                  },
                }}
              >
                <MenuItem value="ROLE_DELIVERER">deliverer</MenuItem>
                <MenuItem value="ROLE_CUSTOMER">customer</MenuItem>
                <MenuItem value="ROLE_DISPATCHER">dispatcher</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              sx={{ borderRadius: 3 }}
              variant="contained"
              color="primary"
              style={{
                height: "40px",
                width: "140px",
                marginTop: "20px",
              }}
            >
              Register
            </Button>
            {isOpenAlert && (
              <Snackbar
                open={isOpenAlert}
                autoHideDuration={3000}
                onClose={() => setIsOpenAlert(null)}
              >
                <Alert
                  onClose={() => setIsOpenAlert(null)}
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

export default Register;
