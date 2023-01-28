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
    h2: {
      fontFamily: "Lucida",
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
