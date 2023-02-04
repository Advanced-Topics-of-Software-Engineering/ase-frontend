import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#764c87",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fcfceb",
      contrastText: "#ffffff",
    },
  },
  typography: {
    body: {
      fontFamily: "Lucida",
    },
    title: {
      fontFamily: "Lucida",
      fontSize: 40,
      fontWeight: "bold",
    },
    h2: {
      fontFamily: "Lucida",
      fontSize: 50,
      fontWeight: "bold",
    },
    button: {
      fontFamily: "Lucida",
      fontWeight: "bold",
      fontSize: 20,
      textTransform: "capitalize",
    },
    h3: {
      fontFamily: "Lucida",
      fontWeight: "bold",
      fontSize: 23,
      textTransform: "capitalize",
      color: "white",
    },
  },
});

export default theme;
