import * as React from "react";
import {
  Button,
  Container,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

const pages = [
  {
    name: "Deliverers",
    endpoint: "deliverers",
  },
  { name: "Customers", endpoint: "customers" },
  { name: "Pickup Boxes", endpoint: "pickup-boxes" },
  {
    name: "Deliveries",
    endpoint: "deliveries",
    name: "Add new user",
    endpoint: "sign-up",
  },
];

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ASE - 23
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={page.endpoint}
                sx={{ my: 2, mx: 3, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
