import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CustomAccordion(props) {
  return (
    <div>
      <Accordion
        sx={{
          boxShadow: "5",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add new value</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{props.name}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
