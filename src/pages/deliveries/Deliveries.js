import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import "../../App.css";
import axios from "axios";
import CustomAccordion from "../../components/CustomAccordion";
import ResponsiveDialog from "../../components/ResponsiveDialog";
import url from "../../API";

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
    field: "customerUsername",
    headerName: "Customer Username",
    flex: 1,
    editable: true,
  },
  {
    field: "delivererUsername",
    headerName: "Deliverer Username",
    flex: 1,
    editable: true,
  },
  {
    field: "boxID",
    hide: true,
  },
];

const Deliveries = () => {
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
  const [newDelivery, setNewDelivery] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [updatedDeliveries, setUpdatedDeliveries] = useState([]);
  const [deletedDeliveries, setDeletedDeliveries] = useState([]);
  const [isAlertforDelete, setIsAlertforDelete] = useState(false);

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
        })
        .then((response) => {
          setError("");
          setIsOpenAlert(true);
          setIsAlertforDelete(false);
        })
        .catch((error) => {
          setError(error.toJSON().message);
          setIsOpenAlert(true);
          setIsAlertforDelete(false);
        });
    }
  };

  const deleteDeliveries = async () => {
    for (let i = 0; i < deletedDeliveries.length; i++) {
      axios
        .post(`${url.base}/box/delete/${deletedDeliveries[i]}`)
        .then((response) => {
          setError("");
          setIsOpenAlert(true);
          setIsAlertforDelete(true);
        })
        .catch((error) => {
          setError(error.toJSON().message);
          setIsOpenAlert(true);
          setIsAlertforDelete(true);
        });
    }
  };

  const createNewDelivery = async () => {
    axios
      .post(`${url.base}/delivery`, {
        box: {
          id: newDelivery[0],
        },
        customerID: newDelivery[1],
        delivererID: newDelivery[2],
      })
      .then((response) => {
        setError("");
        setIsOpenAlert(true);
      })
      .catch((error) => {
        setError(error.toJSON().message);
        setIsOpenAlert(true);
      });
  };

  const getBoxes = async () => {
    axios
      .get(`${url.base}/box`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
        },
      })
      .then((response) => {
        setBoxes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCustomers = async () => {
    axios
      .get(`${url.auth}/dispatcher/get_all_customers`, {
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
      .get(`${url.auth}/dispatcher/get_all_deliverers`, {
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

  useEffect(() => {
    setAuth(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (auth !== null && auth.userType === "ROLE_DISPATCHER") {
        getDeliveries();
        getBoxes();
        getCustomers();
        getDeliverers();
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
          <CustomAccordion
            datas={[
              {
                title: "Box",
                data: boxes,
              },
              {
                title: "Customer",
                data: customers,
              },
              {
                title: "Deliverer",
                data: deliverers,
              },
            ]}
            newObject={newDelivery}
            handleCreate={createNewDelivery}
            header={"Add new delivery"}
            isTextBoxes={true}
          />
          <DataGrid
            rows={deliveries.map((delivery, idx) => ({
              id: delivery.id,
              status: delivery.status,
              trackingID: delivery.trackingID,
              boxName: delivery.box.name,
              boxAddress: delivery.box.streetAddress,
              customerUsername:
                "Object.entries(delivery.customer).map([key, value]) => value.username)",
              delivererUsername:
                "Object.entries(delivery.deliverer).map(([key, value]) => value.username)",
              boxID: delivery.box.id,
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
              type="delete"
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
            handleYesClick={() => {
              isAlertforDelete ? updateDeliveries() : deleteDeliveries();
            }}
          />
          {isOpenAlert && (
            <Snackbar
              open={isOpenAlert}
              autoHideDuration={1000}
              onClose={() => {
                setIsOpenAlert(null);
                window.location.reload(true);
              }}
            >
              <Alert
                onClose={() => {
                  setIsOpenAlert(null);
                }}
                severity={error === "" ? "success" : "error"}
                sx={{ width: "100%" }}
              >
                {error === ""
                  ? ` ${
                      deletedDeliveries.length > 1 ? "Deliveries" : "Delivery "
                    } ${isAlertforDelete ? "deleted" : "updated"} successfully`
                  : error}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Deliveries;
