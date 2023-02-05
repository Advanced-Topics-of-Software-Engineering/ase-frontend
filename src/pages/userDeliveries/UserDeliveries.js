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
  { field: "trackingCode", headerName: "Tracking Code", flex: 1 },
  { field: "customer", headerName: "Assigned Customer", flex: 1 },
  { field: "boxName", headerName: "Assigned Box Name", flex: 1 },
  { field: "boxAddress", headerName: "Assigned Box Address", flex: 1 },
  { field: "status", headerName: "Status", flex: 1, editable: true },
];

const UserDeliveries = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: "",
      status: "",
      trackingID: "",
      box: {
        id: "",
        name: "",
      },
      customer: {
        id: "",
        username: "",
      },
      deliverer: {
        id: "",
        username: "",
      },
    },
  ]);
  const [updatedDeliveries, setUpdatedDeliveries] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [error, setError] = useState();

  const handleProcessRowUpdate = (newRow, oldRow) => {
    setUpdatedDeliveries([...updatedDeliveries, newRow]);
  };

  const getDeliveries = async () => {
    axios
      .get(`${url.base}/delivery`, {
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
      axios
        .post(`${url.base}/delivery/update/${updatedDeliveries[i].id}`, {
          status: updatedDeliveries[i].status,
        })
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
    setTimeout(() => {
      getDeliveries();
    }, 100);
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
          sx={{ height: "80vh", width: "90%" }}
        >
          <DataGrid
            rows={deliveries.map((delivery, idx) => ({
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
            processRowUpdate={handleProcessRowUpdate}
            style={{
              marginTop: 10,
              backgroundColor: "#fcfbfa",
            }}
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
            handleYesClick={updateDeliveries}
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

export default UserDeliveries;
