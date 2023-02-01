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
} from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import "./Register.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    rfidToken: "",
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <div class="register-background">
          <div class="bg"></div>
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
              name="rfidToken"
              value={inputs.rfidToken}
              margin="normal"
              type={"text"}
              variant="outlined"
              label="rfid token"
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
                onChange={handleChange}
                autoWidth
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
                <MenuItem value="Deliverer">Deliverer</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
              </Select>
            </FormControl>
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
              Register
            </Button>
          </Box>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Register;
