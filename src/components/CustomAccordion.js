import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";

export default function CustomAccordion({
  firstField,
  secondField,
  thirdField,
  title,
  available,
  handleCreate,
}) {
  useEffect(() => {}, [available]);

  return (
    <div>
      <form>
        <Accordion
          sx={{
            boxShadow: "5",
            backgroundColor: "#fcfbfa",
            ".MuiSvgIcon-root ": {
              fill: "white",
            },
          }}
        >
          <AccordionSummary
            sx={{
              backgroundColor: "#ae93b8",
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h3">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{firstField}</AccordionDetails>
          <AccordionDetails>{secondField}</AccordionDetails>
          {available ? (
            <AccordionDetails>{thirdField}</AccordionDetails>
          ) : (
            <div></div>
          )}
          <Button
            sx={{ borderRadius: 1 }}
            variant="contained"
            color="primary"
            style={{
              height: "40px",
              width: "140px",
              margin: "16px",
            }}
            onClick={handleCreate}
          >
            Add
          </Button>
        </Accordion>
      </form>
    </div>
  );
}
