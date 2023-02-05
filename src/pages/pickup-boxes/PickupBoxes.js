import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import "../../App.css";
import axios from "axios";
import url from "../../API";
import CustomAccordion from "../../components/CustomAccordion";
import ResponsiveDialog from "../../components/ResponsiveDialog";
import Input from "../../components/Input/Input";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
    editable: true,
  },
];

const PickupBoxes = () => {
  const [boxes, setBoxes] = useState([]);
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
  const [newBox, setNewBox] = useState({ name: "", streetAddress: "" });
  const [updatedBoxes, setUpdatedBoxes] = useState([]);
  const [deletedBoxes, setDeletedBoxes] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isAlertforDelete, setIsAlertforDelete] = useState(false);

  const handleChange = (e) => {
    setNewBox((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProcessRowUpdate = (newRow, oldRow) => {
    setUpdatedBoxes([...updatedBoxes, newRow]);
  };

  const getBoxes = async () => {
    axios
      .get(`${url.base}/box`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setBoxes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateBoxes = async () => {
    for (let i = 0; i < updatedBoxes.length; i++) {
      axios
        .post(
          `${url.base}/box/update/${updatedBoxes[i].id}`,
          {
            name: updatedBoxes[i].name,
            streetAddress: updatedBoxes[i].address,
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

  const deleteBoxes = () => {
    for (let i = 0; i < deletedBoxes.length; i++) {
      axios
        .post(
          `${url.base}/box/delete/${deletedBoxes[i]}`,
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

  const createNewBox = async () => {
    axios
      .post(
        `${url.base}/box`,
        {
          name: newBox.name,
          streetAddress: newBox.streetAddress,
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

  useEffect(() => {
    setAuth(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (auth !== null && auth.userType === "ROLE_DISPATCHER") {
        getBoxes();
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
          sx={{
            height: "80vh",
            width: "90%",
          }}
        >
          <CustomAccordion
            title={"Add New Box"}
            firstField={
              <Input
                name={"name"}
                margin={""}
                onChange={handleChange}
                label={"Name"}
              />
            }
            secondField={
              <Input
                name={"streetAddress"}
                margin={""}
                onChange={handleChange}
                label={"Address"}
              />
            }
            available={false}
            handleCreate={createNewBox}
          />
          <DataGrid
            rows={boxes.map((box) => ({
              id: box.id,
              name: box.name,
              address: box.streetAddress,
            }))}
            columns={columns}
            editMode="row"
            pageSize={7}
            disableSelectionOnClick
            disableColumnMenu
            checkboxSelection
            experimentalFeatures={{ newEditingApi: true }}
            onSelectionModelChange={(itm) => setDeletedBoxes(itm)}
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
              disabled={deletedBoxes.length < 1}
              sx={{ borderRadius: 1 }}
              variant="contained"
              color="primary"
              style={{
                height: "40px",
                width: "260px",
                marginTop: "10px",
                marginRight: "30px",
              }}
              onClick={() => {
                setIsOpenDialog(true);
                setIsAlertforDelete(true);
              }}
            >
              {" "}
              Delete Selected {deletedBoxes.length > 1 ? "Items" : "Item"}{" "}
            </Button>
            <Button
              disabled={updatedBoxes.length < 1}
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

          <ResponsiveDialog
            isOpen={isOpenDialog}
            handleClose={() => setIsOpenDialog(false)}
            title="Are you sure?"
            handleYesClick={() => {
              isAlertforDelete ? deleteBoxes() : updateBoxes();
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

export default PickupBoxes;
