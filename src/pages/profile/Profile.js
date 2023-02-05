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
      return false;
    }
  }
  return true;
}
function setEmailButton(input) {
  if (input.newEmail !== "") {
    return false;
  }
  return true;
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

  const [controlPassword, setControlPassword] = useState(true);
  const [controlEmail, setControlEmail] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
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

  const handlePassword = (e) => {
    e.preventDefault();
    axios
      .post(
        `${url.base}/user/change_password/${auth.username}`,
        {
          oldPassword: inputs.oldPassword,
          newPassword: inputs.newPassword,
          newPasswordRepeat: inputs.newPasswordRepeat,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "ase",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        setError("");
        setIsOpenAlert(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setIsOpenAlert(true);
      });
  };
  const handleEmail = (e, options) => {
    console.log(controlEmail, controlPassword);
    if (controlPassword === false) {
      console.log("jhfdghvkh");
      axios
        .post(
          `${url.base}/user/change_password/${auth.username}`,
          {
            oldPassword: inputs.oldPassword,
            newPassword: inputs.newPassword,
            newPasswordRepeat: inputs.newPasswordRepeat,
          },
          {
            headers: {
              "ngrok-skip-browser-warning": "ase",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.status);
          setError("");

          setIsOpenAlert(true);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setIsOpenAlert(true);
        });
    } else if (controlEmail === false) {
      console.log(123);
      axios
        .post(
          `${url.base}/user/change_email/${auth.username}`,
          {
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
          console.log(response.status);
          setError("");

          setIsOpenAlert(true);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setIsOpenAlert(true);
        });
    }
  };
  const [error, setError] = useState();
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  useEffect(() => {
    setAuth(JSON.parse(sessionStorage.getItem("user")));
  }, []);
  console.log(controlEmail, controlPassword, setEmailButton("inputs"));
  return (
    <ThemeProvider theme={theme}>
      <div class="App-background">
        <div class="App-background bg"></div>
        <form onSubmit={handleEmail}>
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
            {controlEmail ? (
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
                  label={controlEmail ? auth.email : "new email"}
                  disabled={controlEmail}
                  required={controlEmail ? false : true}
                />
                <Input
                  onChange={handleChange}
                  name="oldPassword"
                  label="old password"
                  disabled={controlEmail}
                  required={controlEmail ? false : true}
                  isSecured={true}
                />
              </Box>
            )}{" "}
            {controlPassword ? (
              <Box> </Box>
            ) : (
              <Box>
                <Input
                  onChange={handleChange}
                  name="oldPassword"
                  label="old password"
                  disabled={controlPassword}
                  required={controlPassword ? false : true}
                  isSecured={true}
                />
                <Input
                  onChange={handleChange}
                  name="newPassword"
                  label="new password"
                  disabled={controlPassword}
                  required={controlPassword ? false : true}
                  isSecured={true}
                />
                <Input
                  onChange={handleChange}
                  name="newPasswordRepeat"
                  label="new password repeated"
                  disabled={controlPassword}
                  required={controlPassword ? false : true}
                  isSecured={true}
                />
              </Box>
            )}{" "}
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
                disabled={
                  (!controlPassword && setPasswordButton(inputs)) ||
                  !controlEmail
                }
                onClick={() => {
                  if (!setPasswordButton(inputs) && controlPassword) {
                  } else {
                    setControlPassword((current) => !current);
                    handleEmail();
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
                disabled={
                  (!controlEmail && setEmailButton(inputs)) || !controlPassword
                }
                onClick={() => {
                  if (!setEmailButton(inputs) && controlEmail) {
                  } else {
                    setControlEmail((current) => !current);
                    handleEmail();
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
            <ResponsiveDialog
              isOpen={isOpenDialog}
              handleClose={() => setIsOpenDialog(false)}
              title="Are you sure?"
            />
            {isOpenAlert && (
              <Snackbar
                open={isOpenAlert}
                autoHideDuration={6000}
                onClose={() => setIsOpenAlert(null)}
              >
                <Alert
                  onClose={() => setIsOpenAlert(null)}
                  severity={error === "" ? "success" : "error"}
                  sx={{ width: "100%" }}
                >
                  {error === "" ? "Values successfully changed" : error}
                </Alert>
              </Snackbar>
            )}
          </Box>
        </form>
      </div>
    </ThemeProvider>
  );
}
export default Profile;
