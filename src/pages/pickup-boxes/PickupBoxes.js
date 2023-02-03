import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import "../../App.css";
import axios from "axios";
import baseURL from "../../API";
import CustomAccordion from "../Accordion";
import ResponsiveDialog from "../ResponsiveDialog";

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
  const [updatedBoxes, setUpdatedBoxes] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [error, setError] = useState();

  const handleProcessRowUpdate = (newRow, oldRow) => {
    setUpdatedBoxes([...updatedBoxes, newRow]);
  };

  const getBoxes = () => {
    axios
      .get(`${baseURL}/box`, {
        headers: {
          "ngrok-skip-browser-warning": "ase",
        },
        params: {
          id: "",
          name: "",
          streetAddress: "",
        },
      })
      .then((response) => {
        setBoxes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateBoxes = () => {
    for (let i = 0; i < updatedBoxes.length; i++) {
      const newBox = {
        name: updatedBoxes[i].name,
        streetAddress: updatedBoxes[i].address,
      };
      axios
        .post(`${baseURL}/box/update/${updatedBoxes[i].id}`, newBox)
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
    getBoxes();
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
          sx={{
            height: "75vh",
            width: "90%",
          }}
        >
          <CustomAccordion />
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
            handleYesClick={updateBoxes}
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
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default PickupBoxes;
