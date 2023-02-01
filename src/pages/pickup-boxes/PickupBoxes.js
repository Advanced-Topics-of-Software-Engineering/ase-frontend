import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import "../../App.css";
import axios from "axios";
import baseURL from "../../API";
import CustomAccordion from "../Accordion";

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 100,
    editable: true,
    sortable: false,
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: "alive",
    headerName: "Alive",
    width: 100,
    editable: true,
    sortable: false,
  },
];

const PickupBoxes = () => {
  const [boxes, setBoxes] = useState([]);
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
          alive: "",
        },
      })
      .then((response) => {
        setBoxes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
              alive: box.alive,
            }))}
            columns={columns}
            editMode="row"
            pageSize={7}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
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

export default PickupBoxes;
