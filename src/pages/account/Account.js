import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Account.css";
import {
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function Account() {
  const noButtonRef = React.useRef(null);
  const [rowValues, setRowValues] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newStatus, oldStatus) =>
      new Promise((resolve, reject) => {
        if (newStatus.status !== oldStatus.status) {
          setRowValues({ resolve, reject, newStatus, oldStatus });
        } else {
          resolve(oldStatus);
        }
      }),
    []
  );
  const [accounts, setAccount] = useState([]);
  const getAccount = () => {
    axios
      .get(
        "https://3e0a-138-246-3-200.eu.ngrok.io/delivery/user/63d54d91f74e26d3d2748bbf",
        {
          headers: {
            "ngrok-skip-browser-warning": "ase",
          },
          params: {
            id: "",
            box: {},
            customer: {},
            deliverer: {},
            status: "",
            trackingID: "",
          },
        }
      )
      .then((response) => {
        setAccount(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAccount();
  }, []);
  const handleNo = () => {
    const { oldStatus, resolve } = rowValues;
    resolve(oldStatus);
    setRowValues(null);
  };

  const handleYes = async () => {
    const { newStatus, oldStatus, reject, resolve } = rowValues;

    try {
      setSnackbar({
        children: "Status successfully changed.",
        severity: "success",
      });
      resolve(newStatus);
      setRowValues(null);
    } catch (error) {
      setSnackbar({ children: "Status can't be empty.", severity: "error" });
      reject(oldStatus);
      setRowValues(null);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "trackingCode", headerName: "Tracking Code", width: 200 },
    { field: "customer", headerName: "Assigned Customer", width: 200 },
    { field: "boxName", headerName: "Assigned Box Name", width: 200 },
    { field: "boxAddress", headerName: "Assigned Box Address", width: 200 },
    { field: "status", headerName: "Status", width: 130, editable: true },
  ];

  const AccountTable = () => {
    if (!rowValues) {
      return null;
    }

    const { newStatus, oldStatus } = rowValues;

    return (
      <Dialog maxWidth="xs" open={!!rowValues}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${
            newStatus.status !== oldStatus.status
              ? `status from '${oldStatus.status}' to '${newStatus.status}'`
              : ""
          }.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div class="account-background">
      <div class="bg"></div>
      <div
        style={{
          height: 400,
          width: "80%",
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        {AccountTable()}
        <DataGrid
          rows={accounts.map((account) => ({
            id: account.id,
            trackingCode: account.trackingID,
            boxName: account.box.name,
            boxAddress: account.box.streetAddress,
            customer: account.customer.rfidtoken,
            status: account.status,
          }))}
          columns={columns}
          pageSize={5}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </div>
  );
}