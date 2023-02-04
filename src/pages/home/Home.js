import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/Theme";
import Header from "../../components/Header";

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div class="register-background">
        <div class="bg"></div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
