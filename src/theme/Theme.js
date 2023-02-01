import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#660090",
    },
    secondary: {
      main: "#fcfceb",
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
  },
});

export default theme;
