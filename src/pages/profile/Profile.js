import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import url from "../../API";
import ResponsiveDialog from "../../components/ResponsiveDialog";
import Input from "../../components/Input/Input";
import AutoFixHighTwoToneIcon from "@mui/icons-material/AutoFixHighTwoTone";
import "../../App.css";

function setPasswordButton(input) {
  if (
    input.oldPassword !== "" &&
    input.newPassword !== "" &&
    input.newPasswordRepeat !== ""
  ) {
    if (input.newPassword === input.newPasswordRepeat) {
      return true;
    }
  }
  return false;
}

function setEmailButton(input) {
  if (input.newEmail !== "" && input.oldPassword !== "") {
    return true;
  }
  return false;
}

function Profile() {
  const [inputs, setInputs] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
    newEmail: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const [auth, setAuth] = useState([
    {
      accessToken: "",
      email: "",
      id: "",
      tokenType: "",
      userType: "",
      username: "",
      rfidToken: "",
    },
  ]);

  const updateUser = async () => {
    axios
      .post(
        `${url.base}/user/${
          isPasswordOpen ? "change_password" : "change_email"
        }/${auth.username}`,
        isPasswordOpen
          ? {
              oldPassword: inputs.oldPassword,
              newPassword: inputs.newPassword,
              newPasswordRepeat: inputs.newPasswordRepeat,
            }
          : {
              oldEmail: auth.email,
              password: inputs.oldPassword,
              newEmail: inputs.newEmail,
              newEmailRepeat: inputs.newEmail,
              username: auth.username,
            },
        {
          headers: {
            "ngrok-skip-browser-warning": "ase",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (isEmailOpen) {
          auth.email = inputs.newEmail;
          sessionStorage.setItem("user", JSON.stringify(auth));
        }
        setMessage(response.data.message);
        setError(false);
        setIsOpenAlert(true);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setError(true);
        setIsOpenAlert(true);
      });
  };

  useEffect(() => {
    setAuth(JSON.parse(sessionStorage.getItem("user")));
  }, [inputs]);

  useEffect(() => {
    console.log(auth.email);
  });

  return (
    <ThemeProvider theme={theme}>
      <div class="App-background">
        <div class="App-background bg"></div>

        <Header />
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={500}
          maxHeight={700}
          alignItems="center"
          justifyContent={"center"}
          margin={"auto"}
          borderRadius={5}
          paddingX={5}
          paddingY={4}
          marginTop={2}
          boxShadow={"5px 5px 10px #ccc"}
          backgroundColor="#fcfceb"
          sx={{
            ":hover:": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography
            sx={{ width: "100%" }}
            variant="h2"
            color="#764c87"
            textAlign="center"
          >
            Profile
          </Typography>
          <Typography
            sx={{ marginTop: 2, width: "100%" }}
            variant="h1"
            color="#764c87"
            textAlign="left"
          >
            username
          </Typography>
          <Input
            onChange={handleChange}
            disabled={true}
            label={auth.username}
            required={false}
          />
          <Typography
            sx={{ marginTop: 2, width: "100%" }}
            variant="h1"
            color="#764c87"
            textAlign="left"
          >
            email
          </Typography>
          <Input
            onChange={handleChange}
            disabled={true}
            label={auth.email}
            required={false}
          />
          {!isEmailOpen ? (
            <Box> </Box>
          ) : (
            <Box
              sx={{ width: "100%" }}
              display="flex"
              flexDirection="column"
              alignItems="space-between"
              justifyContent={"space-between"}
            >
              <Input
                onChange={handleChange}
                type="email"
                name="newEmail"
                label={"new email"}
                required={true}
              />
              <Input
                onChange={handleChange}
                name="oldPassword"
                label="old password"
                required={true}
                isSecured={true}
              />
            </Box>
          )}
          {!isPasswordOpen ? (
            <Box> </Box>
          ) : (
            <Box>
              <Input
                onChange={handleChange}
                name="oldPassword"
                label="old password"
                required={true}
                isSecured={true}
              />
              <Input
                onChange={handleChange}
                name="newPassword"
                label="new password"
                required={true}
                isSecured={true}
              />
              <Input
                onChange={handleChange}
                name="newPasswordRepeat"
                label="new password repeated"
                required={true}
                isSecured={true}
              />
            </Box>
          )}

          {(setPasswordButton(inputs) && isPasswordOpen) ||
          (setEmailButton(inputs) && isEmailOpen) ? (
            <Button
              variant="contained"
              endIcon={<AutoFixHighTwoToneIcon />}
              sx={{ borderRadius: 1 }}
              style={{
                height: "40px",
                width: "220px",
                marginTop: "10px",
                backgroundColor: "#ae93b8",
              }}
              onClick={updateUser}
            >
              Submit Changes
            </Button>
          ) : (
            <Box
              sx={{ width: "100%" }}
              display="flex"
              flexDirection="row"
              alignItems="space-between"
              justifyContent={"space-between"}
            >
              <Button
                variant="contained"
                endIcon={<AutoFixHighTwoToneIcon />}
                onClick={() => {
                  setIsPasswordOpen((current) => !current);
                  if (isEmailOpen) {
                    setIsEmailOpen(false);
                  }
                }}
                sx={{ borderRadius: 1 }}
                style={{
                  height: "40px",
                  width: "200px",
                  marginTop: "10px",
                  backgroundColor: "#ae93b8",
                }}
              >
                Edit Password
              </Button>

              <Button
                variant="contained"
                endIcon={<AutoFixHighTwoToneIcon />}
                onClick={() => {
                  setIsEmailOpen((current) => !current);
                  if (isPasswordOpen) {
                    setIsPasswordOpen(false);
                  }
                }}
                sx={{ borderRadius: 1 }}
                style={{
                  height: "40px",
                  width: "200px",
                  marginTop: "10px",
                  backgroundColor: "#ae93b8",
                }}
              >
                Edit Email
              </Button>
            </Box>
          )}
          {isOpenAlert && (
            <Snackbar
              open={isOpenAlert}
              autoHideDuration={1000}
              onClose={() => {
                setIsOpenAlert(null);
                if (!error) {
                  window.location.reload(true);
                }
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
    </ThemeProvider>
  );
}
export default Profile;
