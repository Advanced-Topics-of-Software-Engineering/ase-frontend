import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function CustomSelect({ options, title, onChangeHandler }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    onChangeHandler(event);
  };
  return (
    <div>
      <form>
        <FormControl fullWidth required variant="outlined">
          <InputLabel style={{ color: "#660090" }}>{title}</InputLabel>
          <Select
            name={title}
            variant="outlined"
            value={value}
            onChange={handleChange}
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
            {options.map((option) => (
              <MenuItem value={option.id} key={option.id}>
                {typeof option.username !== "undefined"
                  ? option.username
                  : option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </div>
  );
}
