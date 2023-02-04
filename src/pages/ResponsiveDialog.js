import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function ResponsiveDialog({ isOpen, title, handleClose, handleYesClick }) {
  return (
    <div>
      <Dialog
        fullWidth
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{""}</DialogTitle>
        <DialogContent>
          <DialogContentText>{title}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
          <Button
            onClick={() => {
              handleYesClick();
              handleClose();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResponsiveDialog;
