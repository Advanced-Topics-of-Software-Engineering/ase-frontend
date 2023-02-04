import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import "./Register.css";
import Header from "../../components/Header";
import axios from "axios";
import url from "../../API";
import Input from "../../components/Input/Input";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [auth, setAuth] = useState([
    {
      accessToken: "",
      email: "",
      id: "",
      tokenType: "",
      userType: "",
      username: "",
    },
  ]);
  const [userType, setUserType] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState();

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
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        setMessage(response.data.message);
        setIsOpenAlert(true);
        setError(false);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setIsOpenAlert(true);
        setError(true);
      });
  };

  useEffect(() => {
    setAuth(JSON.parse(sessionStorage.getItem("user")));
  }, []);

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
            <Input
              name="email"
              type={"email"}
              label="email"
              onChange={handleChange}
            />
            <Input name="username" label="username" onChange={handleChange} />
            <Input
              name="password"
              label="password"
              onChange={handleChange}
              isSecured={true}
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
                autoHideDuration={1000}
                onClose={() => {
                  setIsOpenAlert(null);
                }}
              >
                <Alert
                  onClose={() => {
                    setIsOpenAlert(null);
                  }}
                  severity={error ? "error" : "success"}
                  sx={{ width: "100%" }}
                >
                  {message}
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
