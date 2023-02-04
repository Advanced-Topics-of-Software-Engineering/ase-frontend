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
  {
    field: "password",
    headerName: "Password",
    flex: 0.5,
    editable: true,
    sortable: false,
  },
];

function setRole(role) {
  if (role === "ROLE_DISPATHCER") {
    return "dispatcher";
  } else if (role === "ROLE_CUSTOMER") {
    return "customer";
  } else if (role === "ROLE_DELIVERER") {
    return "deliverer";
  }
}

const Customer = () => {
  const [customers, setCustomer] = useState([
    {
      id: "",
      email: "",
      rfidtoken: "",
      username: "",
      role: "",
      password: "",
    },
  ]);
  const [updatedCustomers, setUpdatedCustomers] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [error, setError] = useState();
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

  const handleProcessRowUpdate = (newRow, oldRow) => {
    setUpdatedCustomers([...updatedCustomers, newRow]);
  };

  const getCustomers = () => {
    axios
      .get(`${url.auth}/dispatcher/get_all_customers`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateCustomers = () => {
    for (let i = 0; i < updatedCustomers.length; i++) {
      axios
        .post(
          `${url.auth}/dispatcher/edit_user/${updatedCustomers[i].id}`,
          {
            username: updatedCustomers[i].username,
            email: updatedCustomers[i].email,
            password: updatedCustomers[i].password,
          },
          {
            headers: {
              "ngrok-skip-browser-warning": "ase",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((response) => {
          setError("");
          setIsOpenAlert(true);
          getCustomers();
        })
        .catch((error) => {
          setError(error.response.data.message);
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
        getCustomers();
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
            rows={customers.map((customer) => ({
              id: customer.id,
              username: customer.username,
              email: customer.email,
              rfidtoken: customer.rfidtoken,
              role: setRole(customer.role),
            }))}
            columns={columns}
            editMode="row"
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={handleProcessRowUpdate}
            style={{ marginTop: 10, backgroundColor: "#fcfbfa" }}
            sx={{
              boxShadow: "5",
            }}
          />
          <Button
            type="submit"
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
            handleYesClick={updateCustomers}
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
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Customer;
