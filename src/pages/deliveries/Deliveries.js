import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import "../../App.css";
import axios from "axios";
import baseURL from "../../API";
import Accordion from "../Accordion";

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    editable: true,
    sortable: false,
  },
  {
    field: "trackingID",
    headerName: "Tracking ID",
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: "boxName",
    headerName: "Box Name",
    width: 100,
    editable: true,
    sortable: false,
  },
  {
    field: "boxAddress",
    headerName: "Box Address",
    width: 200,
    editable: true,
    sortable: false,
  },
  {
    field: "customerId",
    headerName: "Customer ID",
    width: 250,
    editable: true,
    sortable: false,
  },
  {
    field: "delivererId",
    headerName: "Deliverer ID",
    width: 250,
    editable: true,
    sortable: false,
  },
];

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const getDeliveries = () => {
    axios
      .get(`${baseURL}/delivery`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
        },
        params: {
          id: "",
          status: "",
          trackingID: "",
          box: {},
          customer: {},
          deliverer: {},
        },
      })
      .then((response) => {
        setDeliveries(response.data);
        console.log(deliveries);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDeliveries();
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
          <Accordion />
          <DataGrid
            rows={deliveries.map((delivery) => ({
              id: delivery.id,
              status: delivery.status,
              trackingID: delivery.trackingID,
              boxName: delivery.box.name,
              boxAddress: delivery.box.streetAddress,
              customerId: delivery.customer.id,
              delivererId: delivery.deliverer.id,
            }))}
            columns={columns}
            editMode="row"
            pageSize={7}
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

export default Deliveries;
