import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import "../../App.css";
import axios from "axios";
import url from "../../API";
import Input from "../../components/Input/Input";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.7,
  },
  {
    field: "trackingID",
    headerName: "Tracking ID",
    flex: 1,
  },
  {
    field: "boxName",
    headerName: "Box Name",
    flex: 0.5,
  },
  {
    field: "boxAddress",
    headerName: "Box Address",
    flex: 1,
  },
  {
    field: "customerUsername",
    headerName: "Customer ID",
    flex: 0.7,
  },
  {
    field: "delivererUsername",
    headerName: "Deliverer ID",
    flex: 0.7,
  },
  {
    field: "boxID",
    hide: true,
  },
];

const Tracking = () => {
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
  const [delivery, setDelivery] = useState({
    id: "",
    box: {
      id: "",
      name: "",
      streetAddress: "",
    },
    customerID: "",
    delivererID: "",
    status: "",
    trackingID: "",
  });
  const [trackingID, setTrackingID] = useState("");
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const getDeliveryByTrackingID = () => {
    axios
      .get(`${url.base}/delivery/trackingID/${trackingID}`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setDelivery(response.data);
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
  }, []);

  useEffect(() => {
    console.log(delivery);
  }, [delivery]);

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
          marginTop={10}
          sx={{ height: "50vh", width: "90%" }}
        >
          <Box
            borderRadius={1}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent={"space-between"}
            paddingX={2}
            backgroundColor="#fcfbfa"
          >
            <Input
              fullWidth={false}
              onChange={(e) => setTrackingID(e.target.value)}
              name="trackingID"
              label={"Find delivery by tracking id"}
              required={true}
              style={{ width: "80%" }}
            />
            <Button
              sx={{ borderRadius: 1 }}
              variant="contained"
              color="primary"
              style={{
                height: "40px",
                width: "200px",
              }}
              onClick={() => {
                getDeliveryByTrackingID();
                setIsOpenDialog(true);
              }}
            >
              Search
            </Button>
          </Box>

          <DataGrid
            rows={[
              {
                id: delivery.id,
                status: delivery.status,
                trackingID: delivery.trackingID,
                boxName: delivery.box.name,
                boxAddress: delivery.box.streetAddress,
                customerUsername: delivery.customerID,
                delivererUsername: delivery.delivererID,
              },
            ]}
            columns={columns}
            editMode="row"
            rowsPerPageOptions={[1]}
            disableSelectionOnClick
            disableColumnMenu
            style={{ marginTop: 10, backgroundColor: "#fcfbfa" }}
            sx={{
              boxShadow: "5",
            }}
          />

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

export default Tracking;
