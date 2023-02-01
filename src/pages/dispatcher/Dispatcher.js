import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../Header";
import "../../App.css";

const Dispatcher = () => {
  return (
    <ThemeProvider theme={theme}>
      <div class="App-background">
        <div class="App-background bg"></div>
        <Header />
      </div>
    </ThemeProvider>
  );
};

export default Dispatcher;
