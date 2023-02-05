import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import "../../App.css";
import axios from "axios";
import CustomAccordion from "../../components/CustomAccordion";
import CustomSelect from "../../components/CustomSelect";
import ResponsiveDialog from "../../components/ResponsiveDialog";
import url from "../../API";

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
    field: "customerId",
    headerName: "Customer ID",
    flex: 0.7,
  },
  {
    field: "delivererId",
    headerName: "Deliverer ID",
    flex: 0.7,
  },
  {
    field: "boxID",
    hide: true,
  },
];

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
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
  const [boxes, setBoxes] = useState([{}]);
  const [customers, setCustomers] = useState([{}]);
  const [deliverers, setDeliverers] = useState([{}]);
  const [newDelivery, setNewDelivery] = useState({
    customer: "",
    box: "",
    deliverer: "",
  });
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [updatedDeliveries, setUpdatedDeliveries] = useState([]);
  const [deletedDeliveries, setDeletedDeliveries] = useState([]);
  const [isAlertforDelete, setIsAlertforDelete] = useState(false);
  const [isBoxesAvailable, setIsBoxesAvailable] = useState(false);

  const handleProcessRowUpdate = (newRow, oldRow) => {
    setUpdatedDeliveries([...updatedDeliveries, newRow]);
  };

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
      headerName: "Customer Username",
      flex: 0.7,
    },
    {
      field: "delivererUsername",
      headerName: "Deliverer Username",
      flex: 0.7,
    },
    {
      field: "boxID",
      hide: true,
    },
  ];

  const getDeliveries = async () => {
    axios
      .get(`${url.base}/delivery`, {
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

  const updateDeliveries = async () => {
    for (let i = 0; i < updatedDeliveries.length; i++) {
      axios
        .post(
          `${url.base}/delivery/update/${updatedDeliveries[i].id}`,
          {
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

  const deleteDeliveries = async () => {
    for (let i = 0; i < deletedDeliveries.length; i++) {
      axios
        .post(
          `${url.base}/delivery/delete/${deletedDeliveries[i]}`,
          {},
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

  const createNewDelivery = async () => {
    axios
      .post(
        `${url.base}/delivery`,
        {
          customerID: newDelivery.customer,
          boxID: newDelivery.box,
          delivererID: newDelivery.deliverer,
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
  };

  const getBoxes = async () => {
    axios
      .get(`${url.base}/box/available/${newDelivery.customer}`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setBoxes(response.data);
        setIsBoxesAvailable(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCustomers = async () => {
    axios
      .get(`${url.base}/dispatcher/get_all_customers`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDeliverers = async () => {
    axios
      .get(`${url.base}/dispatcher/get_all_deliverers`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setDeliverers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNewDelivery = (e) => {
    setNewDelivery((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const downloadQR = () => {
  //   const canvas = document.getElementById("hkadjshdsk");
  //   const pngUrl = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   let downloadLink = document.createElement("a");
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = "123456.png";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };

  useEffect(() => {
    getBoxes();
  }, [newDelivery.customer]);

  useEffect(() => {
    setAuth(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (auth !== null && auth.userType === "ROLE_DISPATCHER") {
        getDeliveries();
        getCustomers();
        getDeliverers();
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
          <CustomAccordion
            title={"Add New Delivery"}
            firstField={
              <CustomSelect
                title={"deliverer"}
                options={deliverers}
                onChangeHandler={handleNewDelivery}
              />
            }
            secondField={
              <CustomSelect
                title={"customer"}
                options={customers}
                onChangeHandler={handleNewDelivery}
              />
            }
            available={isBoxesAvailable}
            thirdField={
              <CustomSelect
                title={"box"}
                options={boxes}
                onChangeHandler={handleNewDelivery}
              />
            }
            handleCreate={createNewDelivery}
          />
          <DataGrid
            rows={deliveries.map((delivery, idx) => ({
              id: delivery.id,
              status: delivery.status,
              trackingID: delivery.trackingID,
              boxName: delivery.box.name,
              boxAddress: delivery.box.streetAddress,
              customerId: delivery.customerID,
              delivererId: delivery.delivererID,
              boxID: delivery.box.id,
              qrCode: delivery.trackingID,
            }))}
            columns={columns}
            editMode="row"
            pageSize={7}
            disableSelectionOnClick
            disableColumnMenu
            checkboxSelection
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
            justifyContent={"space-between"}
          >
            <Button
              disabled={deletedDeliveries.length < 1}
              sx={{ borderRadius: 1 }}
              variant="contained"
              color="primary"
              style={{
                height: "40px",
                width: "250px",
                marginTop: "10px",
              }}
              onClick={() => {
                setIsOpenDialog(true);
                setIsAlertforDelete(true);
              }}
            >
              {" "}
              Delete Selected {deletedDeliveries.length > 1
                ? "Items"
                : "Item"}{" "}
            </Button>
            <Button
              disabled={updatedDeliveries.length < 1}
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
                setIsAlertforDelete(false);
              }}
            >
              Submit Changes
            </Button>
          </Box>

          {/* <QRCodeScan
          // handler={updateDeliveryStatus(
          //   "e6e0872ec773ddc00889b8bd3b3cfa3b6afef831c0102fb9442e186e4078b2d0"
          // )}
          />
          <QRCodeGenerator
            id={
              "https://chat.openai.com/chat/c3e74b98-b90a-4a3c-9ed2-daeebdfad375"
            }
          /> */}

          {/* <a onClick={downloadQR}> Download QR </a> */}
          <ResponsiveDialog
            isOpen={isOpenDialog}
            handleClose={() => setIsOpenDialog(false)}
            title="Are you sure?"
            handleYesClick={() => {
              isAlertforDelete ? deleteDeliveries() : updateDeliveries();
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

export default Deliveries;
