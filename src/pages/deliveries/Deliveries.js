import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import "../../App.css";
import axios from "axios";
import baseURL from "../../API";
import Accordion from "../Accordion";
import ResponsiveDialog from "../ResponsiveDialog";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Ordered", "On Delivery", "Delivered", "Completed"],
  },
  {
    field: "trackingID",
    headerName: "Tracking ID",
    flex: 1,
    editable: true,
  },
  {
    field: "boxName",
    headerName: "Box Name",
    flex: 0.5,
    editable: true,
  },
  {
    field: "boxAddress",
    headerName: "Box Address",
    flex: 1,
    editable: true,
  },
  {
    field: "customerId",
    headerName: "Customer Name",
    flex: 1,
    editable: true,
  },
  {
    field: "delivererId",
    headerName: "Deliverer Name",
    flex: 1,
    editable: true,
  },
  {
    field: "boxID",
    hide: true,
  },
];

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [updatedDeliveries, setUpdatedDeliveries] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [error, setError] = useState();
  const [deletedDeliveries, setDeletedDeliveries] = useState([]);

  const handleProcessRowUpdate = (newRow, oldRow) => {
    setUpdatedDeliveries([...updatedDeliveries, newRow]);
  };

  const getDeliveries = () => {
    axios
      .get(`${baseURL}/delivery`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
        },
      })
      .then((response) => {
        setDeliveries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateDeliveries = async () => {
    for (let i = 0; i < updatedDeliveries.length; i++) {
      const newDelivery = {
        id: updatedDeliveries[i].id,
        status: updatedDeliveries[i].status,
        trackingID: updatedDeliveries[i].trackingID,
        box: {
          id: updatedDeliveries[i].boxID,
          streetAddress: updatedDeliveries[i].boxAddress,
          name: updatedDeliveries[i].boxName,
        },
        customer: {
          id: updatedDeliveries[i].customerId,
        },
        deliverer: {
          id: updatedDeliveries[i].delivererId,
        },
      };
      axios
        .post(
          `${baseURL}/delivery/update/${updatedDeliveries[i].id}`,
          newDelivery
        )
        .then((response) => {
          console.log(response.status);
          setError("");
          setIsOpenAlert(true);
        })
        .catch((error) => {
          setError(error.toJSON().message);
          setIsOpenAlert(true);
        });
    }
  };

  const deleteDeliveries = () => {
    for (let i = 0; i < deletedDeliveries.length; i++) {
      axios
        .post(`${baseURL}/box/delete/${deletedDeliveries[i]}`)
        .then((response) => {
          console.log(response.status);
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
              boxID: delivery.box.id,
            }))}
            columns={columns}
            editMode="row"
            pageSize={7}
            disableSelectionOnClick
            disableColumnMenu
            experimentalFeatures={{ newEditingApi: true }}
            onSelectionModelChange={(itm) => setDeletedDeliveries(itm)}
            processRowUpdate={handleProcessRowUpdate}
            style={{
              marginTop: 10,
              backgroundColor: "#fcfbfa",
            }}
            sx={{
              boxShadow: "5",
            }}
          />
          <Box
            display="flex"
            flexDirection="row"
            my={2}
            justifyContent={"space-between"}
          >
            <Button
              type="delete"
              sx={{ marginTop: 3, borderRadius: 1 }}
              variant="contained"
              color="primary"
              style={{
                height: "40px",
                width: "250px",
                marginTop: "10px",
                marginRight: "30px",
              }}
              onClick={() => {
                setIsOpenDialog(true);
              }}
            >
              {" "}
              Delete Selected {deletedDeliveries.length > 1
                ? "Items"
                : "Item"}{" "}
            </Button>
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
          </Box>
          <ResponsiveDialog
            isOpen={isOpenDialog}
            handleClose={() => setIsOpenDialog(false)}
            title="Are you sure?"
            handleYesClick={updateDeliveries}
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
          <ResponsiveDialog
            isOpen={isOpenDialog}
            handleClose={() => setIsOpenDialog(false)}
            title="Are you sure?"
            handleYesClick={deleteDeliveries}
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
                {error === "" ? "Values successfully deleted" : error}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Deliveries;
