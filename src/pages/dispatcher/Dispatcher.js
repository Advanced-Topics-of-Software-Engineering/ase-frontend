import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import "../../App.css";
import axios from "axios";
import url from "../../API";
import ResponsiveDialog from "../../components/ResponsiveDialog";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "username",
    headerName: "Username",
    flex: 1,
    editable: true,
    sortable: false,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    editable: true,
    sortable: false,
  },
  {
    field: "role",
    headerName: "User Type",
    flex: 1,
    sortable: false,
  },
];

function setRole(role) {
  if (role === "ROLE_DISPATCHER") {
    return "dispatcher";
  } else if (role === "ROLE_CUSTOMER") {
    return "customer";
  } else if (role === "ROLE_DELIVERER") {
    return "deliverer";
  }
}

const Dispatcher = () => {
  const [dispatchers, setDispatchers] = useState([]);

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

  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [updatedDispatchers, setUpdatedDispatchers] = useState([]);

  const handleProcessRowUpdate = (newRow, oldRow) => {
    setUpdatedDispatchers([...updatedDispatchers, newRow]);
  };

  const getDispatchers = () => {
    axios
      .get(`${url.base}/dispatcher/get_all_dispatchers`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setDispatchers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateDispatchers = async () => {
    for (let i = 0; i < updatedDispatchers.length; i++) {
      axios
        .post(
          `${url.base}/dispatcher/edit_user/${updatedDispatchers[i].id}`,
          {
            username: updatedDispatchers[i].username,
            email: updatedDispatchers[i].email,
            password: updatedDispatchers[i].password,
          },
          {
            headers: {
              "ngrok-skip-browser-warning": "ase",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((response) => {
          setMessage(response.data.message);
          setError(false);
          setIsOpenAlert(true);
        })
        .catch((error) => {
          setMessage(error.response.data.message);
          setError(true);
          setIsOpenAlert(true);
        });
    }
  };

  useEffect(() => {
    setAuth(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (auth !== null && auth.userType === "ROLE_DISPATCHER") {
        getDispatchers();
      }
    }, 100);
  }, [auth]);

  return (
    <ThemeProvider theme={theme}>
      <div class="App-background">
        <div class="App-background bg"></div>
        <Header />
        <Box
          display="flex"
          justifyContent={"center"}
          flexDirection="column"
          marginX={10}
          marginTop={5}
          sx={{ height: "80vh", width: "90%" }}
        >
          <Button
            fullWidth
            sx={{ borderRadius: 1 }}
            variant="contained"
            href={"/sign-up"}
            style={{
              fontSize: "23px",
              justifyContent: "flex-start",
              backgroundColor: "#ae93b8",
            }}
          >
            Add New User
          </Button>
          <DataGrid
            rows={dispatchers.map((dispatcher) => ({
              id: dispatcher.id,
              username: dispatcher.username,
              email: dispatcher.email,
              role: setRole(dispatcher.role),
            }))}
            columns={columns}
            editMode="row"
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
            disableColumnMenu
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={handleProcessRowUpdate}
            style={{ marginTop: 10, backgroundColor: "#fcfbfa" }}
            sx={{
              boxShadow: "5",
            }}
          />

          <Button
            disabled={updatedDispatchers.length < 1}
            sx={{ borderRadius: 1 }}
            variant="contained"
            color="primary"
            style={{
              height: "40px",
              width: "200px",
              marginTop: "10px",
            }}
            onClick={() => {
              setIsOpenDialog(true);
            }}
          >
            Submit Changes
          </Button>
          <ResponsiveDialog
            isOpen={isOpenDialog}
            handleClose={() => setIsOpenDialog(false)}
            title="Are you sure?"
            handleYesClick={() => {
              updateDispatchers();
            }}
          />
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
};

export default Dispatcher;
