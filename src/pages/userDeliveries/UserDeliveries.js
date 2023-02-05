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
import QRCodeGenerator from "../QRCode/QRCodeGenerator";
import CustomPopover from "../../components/CustomPopover";

const UserDeliveries = () => {
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

  const [deliveries, setDeliveries] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [error, setError] = useState();

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "trackingCode", headerName: "Tracking Code", flex: 1 },
    { field: "customer", headerName: "Assigned Customer", flex: 1 },
    { field: "boxName", headerName: "Assigned Box Name", flex: 1 },
    { field: "boxAddress", headerName: "Assigned Box Address", flex: 1 },
    { field: "status", headerName: "Status", flex: 1, editable: true },
    {
      field: "qrCode",
      headerName: "QR Code",
      width: 150,
      renderCell: (params) => {
        const onClick = (e) => {
          updateDeliveryStatus(params.value);
        };
        return (
          <Button onClick={onClick}>
            <CustomPopover code={<QRCodeGenerator id={params.value} />} />
          </Button>
        );
      },
    },
  ];

  function updateDeliveryStatus(trackingID) {
    axios
      .post(
        `${url.base}/delivery/deliverer/updateStatus/${trackingID}`,
        {},
        {
          headers: {
            "ngrok-skip-browser-warning": "ase",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        // setMessage(response.data.message);
        setError(false);
        setIsOpenAlert(true);
      })
      .catch((error) => {
        // setMessage(error.response.data.message);
        setError(true);
        setIsOpenAlert(true);
      });
  }

  const getDeliveriesForDeliverer = async () => {
    axios
      .get(`${url.base}/delivery/deliverer/${auth.id}`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setDeliveries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDeliveriesForCustomer = async () => {
    axios
      .get(`${url.base}/delivery/customer/${auth.id}`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setDeliveries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setAuth(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (auth !== null && auth.userType === "ROLE_DELIVERER") {
        getDeliveriesForDeliverer();
      } else if (auth !== null && auth.userType === "ROLE_CUSTOMER") {
        getDeliveriesForCustomer();
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
            style={{
              marginTop: 10,
              backgroundColor: "#fcfbfa",
            }}
            sx={{
              boxShadow: "5",
            }}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default UserDeliveries;
