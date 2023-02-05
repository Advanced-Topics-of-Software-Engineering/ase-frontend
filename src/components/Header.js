import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

const dispatcherTabs = [
  {
    name: "Dispatchers",
    endpoint: "dispatchers",
  },
  { name: "Customers", endpoint: "customers" },
  {
    name: "Deliverers",
    endpoint: "deliverers",
  },
  { name: "Pickup Boxes", endpoint: "pickup-boxes" },
  {
    name: "Deliveries",
    endpoint: "deliveries",
  },
  {
    name: "Profile",
    endpoint: "profile",
  },
];

const userTabs = [
  {
    name: "Deliveries",
    endpoint: "user-deliveries",
  },
  {
    name: "Profile",
    endpoint: "profile",
  },
];

function Header() {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user !== null) {
      setUserType(user.userType);
    }
  });

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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {userType === "ROLE_DISPATCHER"
              ? dispatcherTabs.map((tab, index) => (
                  <Button
                    key={index}
                    href={tab.endpoint}
                    sx={{ my: 2, mx: 4, color: "white", display: "block" }}
                  >
                    {tab.name}
                  </Button>
                ))
              : userType === ("ROLE_DELIVERER" || "ROLE_CUSTOMER") &&
                userTabs.map((tab, index) => (
                  <Button
                    key={index}
                    href={tab.endpoint}
                    sx={{ my: 2, mx: 4, color: "white", display: "block" }}
                  >
                    {tab.name}
                  </Button>
                ))}
          </Box>
          {userType !== "" ? (
            <Button
              href={"/"}
              onClick={() => {
                sessionStorage.clear();
              }}
              sx={{ color: "white", justifyContent: "flex-end" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              href={"/home"}
              sx={{ color: "white", justifyContent: "flex-end" }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
