import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

export default function CustomPopover({ code }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        style={{ height: "30px", width: "80px", fontSize: "15px" }}
        variant="contained"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        Open QR
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {code}
      </Popover>
    </div>
  );
}
