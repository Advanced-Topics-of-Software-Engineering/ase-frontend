import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

export default function CustomAccordion({
  datas,
  newObject,
  handleCreate,
  header,
  isTextBoxes,
}) {
  const handleChange = (index) => (e) => {
    newObject[index] = e.target.value;
  };
  useEffect(() => {}, [newObject, datas]);
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
            <Typography variant="h3">{header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {isTextBoxes &&
              Object.entries(datas).map(([key, value], index) => {
                return (
                  <FormControl
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                  >
                    <InputLabel style={{ color: "#660090" }}>
                      {value.title}
                    </InputLabel>
                    <Select
                      variant="outlined"
                      value={newObject[index]}
                      onChange={handleChange(index)}
                      label="user type"
                      sx={{
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "#660090",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#660090",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#660090",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "#660090",
                        },
                        ".MuiSvgIcon-root ": {
                          fill: "#660090",
                        },
                      }}
                    >
                      {value.data.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {typeof item.username !== "undefined"
                              ? item.username
                              : item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                );
              })}
            {!isTextBoxes &&
              Object.entries(datas).map(([key, value], index) => {
                return (
                  <TextField
                    fullWidth
                    required
                    name={value.title}
                    value={newObject[index]}
                    onChange={handleChange(index)}
                    margin="normal"
                    type={"text"}
                    variant="outlined"
                    label={value.title}
                    InputProps={{
                      classes: {
                        notchedOutline: "input-border",
                      },
                    }}
                    InputLabelProps={{
                      classes: {
                        root: "inputLabel",
                        focused: "inputLabel",
                      },
                    }}
                  />
                );
              })}

            <Button
              sx={{ borderRadius: 1 }}
              variant="contained"
              color="primary"
              style={{
                height: "40px",
                width: "140px",
                marginTop: "10px",
              }}
              onClick={handleCreate}
            >
              Add
            </Button>
          </AccordionDetails>
        </Accordion>
      </form>
    </div>
  );
}
