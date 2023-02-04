import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import "../../App.css";
import axios from "axios";
import url from "../../API";
import ResponsiveDialog from "../ResponsiveDialog";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "username",
    headerName: "Username",
    flex: 0.5,
    editable: true,
    sortable: false,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.7,
    editable: true,
    sortable: false,
  },
  {
    field: "rfidtoken",
    headerName: "RFID Token",
    flex: 1,
    editable: true,
    sortable: false,
  },
  {
    field: "role",
    headerName: "User Type",
    flex: 0.3,
    editable: true,
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
  const [dispatchers, setDispatchers] = useState([
    {
      id: "",
      email: "",
      rfidtoken: "",
      username: "",
      role: "",
      password: "",
    },
  ]);

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
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deletedDispatchers, setDeletedDispatchers] = useState([]);

  const getDispatchers = () => {
    axios
      .get(`${url.auth}/dispatcher/get_all_dispatchers`, {
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

  const deleteDispatchers = () => {
    for (let i = 0; i < deletedDispatchers.length; i++) {
      axios
        .post(`${url.base}/delivery/delete/${deletedDispatchers[i]}`)
        .then((response) => {
          setError("");
          setIsOpenAlert(true);
        })
        .catch((error) => {
          setError(error.toJSON().message);
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
    }, 500);
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
              rfidtoken: dispatcher.rfidtoken,
              role: setRole(dispatcher.role),
            }))}
            columns={columns}
            editMode="row"
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
            disableColumnMenu
            experimentalFeatures={{ newEditingApi: true }}
            checkboxSelection
            onSelectionModelChange={(itm) => setDeletedDispatchers(itm)}
            style={{ marginTop: 10, backgroundColor: "#fcfbfa" }}
            sx={{
              boxShadow: "5",
            }}
          />
          <ResponsiveDialog
            isOpen={isOpenDialog}
            handleClose={() => setIsOpenDialog(false)}
            title="Are you sure?"
            handleYesClick={deletedDispatchers}
          />
          {isOpenAlert && (
            <Snackbar
              open={isOpenAlert}
              autoHideDuration={1000}
              onClose={() => {
                window.location.reload(true);
                setIsOpenAlert(null);
              }}
            >
              <Alert
                onClose={() => {
                  window.location.reload(true);
                  setIsOpenAlert(null);
                }}
                severity={error === "" ? "success" : "error"}
                sx={{ width: "100%" }}
              >
                {error === "" ? "Values successfully changed" : error}
              </Alert>
            </Snackbar>
          )}
          <ResponsiveDialog
            isOpen={isOpenDialog}
            handleClose={() => setIsOpenDialog(false)}
            title="Are you sure?"
            handleYesClick={() => {
              deletedDispatchers();
            }}
          />
          {isOpenAlert && (
            <Snackbar
              open={isOpenAlert}
              autoHideDuration={1000}
              onClose={() => {
                window.location.reload(true);
                setIsOpenAlert(null);
              }}
            >
              <Alert
                onClose={() => {
                  window.location.reload(true);
                  setIsOpenAlert(null);
                }}
                severity={error === "" ? "success" : "error"}
                sx={{ width: "100%" }}
              >
                {error === ""
                  ? `${
                      deletedDispatchers.length > 1
                        ? "Dispathcers"
                        : "Dispatchers"
                    } 
                      deleted successfully`
                  : error}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Dispatcher;
