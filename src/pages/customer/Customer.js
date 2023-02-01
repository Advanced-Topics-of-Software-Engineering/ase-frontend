import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import "../../App.css";
import axios from "axios";
import baseURL from "../../API";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: "token",
    headerName: "RFID Token",
    width: 200,
    editable: true,
    sortable: false,
  },
  {
    field: "userType",
    headerName: "User Type",
    width: 200,
    sortable: false,
  },
];

const Customer = () => {
  const [customers, setCustomer] = useState([]);
  const getCustomers = () => {
    axios
      .get(`${baseURL}/user/customers`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
        },
        params: {
          id: "",
          userType: "",
          email: "",
          rfidtoken: "",
        },
      })
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCustomers();
  }, []);

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
          sx={{ height: "75vh", width: "90%" }}
        >
          <DataGrid
            rows={customers.map((customer) => ({
              id: customer.id,
              email: customer.email,
              token: customer.rfidtoken,
              userType: customer.userType,
            }))}
            columns={columns}
            editMode="row"
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            style={{ marginTop: 10, backgroundColor: "#fcfbfa" }}
            sx={{
              boxShadow: "5",
            }}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Customer;
