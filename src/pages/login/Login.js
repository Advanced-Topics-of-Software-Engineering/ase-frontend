import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import theme from "../../theme/Theme";
import "./Login.css";
import url from "../../API";
import Input from "../../components/Input/Input";

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [redirect, setRedirect] = React.useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [message, setMessage] = useState();
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
      .post(
        `${url.base}/api/auth/signin`,
        {
          username: inputs.username,
          password: inputs.password,
        },

        {
          headers: {
            "ngrok-skip-browser-warning": "ase",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.accessToken) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        setIsOpenAlert(true);
        setError(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <div class="login-background">
          <div class="bg"></div>
          {redirect && <Navigate to="/profile" />}
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
            <Input onChange={handleChange} name="username" label="username" />
            <Input
              onChange={handleChange}
              name="password"
              label="password"
              isSecured={true}
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

export default Login;
