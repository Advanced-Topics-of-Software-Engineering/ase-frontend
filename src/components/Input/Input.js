import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import "./Input.css";

function Input({
  name,
  type = "text",
  label,
  onChange,
  isSecured = false,
  margin = "normal",
  disabled = false,
  required = true,
  fullWidth = true,
  style = {},
}) {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };

  return !isSecured ? (
    <TextField
      fullWidth={fullWidth}
      required={required}
      onChange={handleChange}
      name={name}
      value={value}
      margin={margin}
      type={type}
      variant="outlined"
      label={label}
      disabled={disabled}
      style={style}
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
  ) : (
    <TextField
      fullWidth
      required={required}
      onChange={handleChange}
      name={name}
      value={value}
      margin="normal"
      type={showPassword ? "text" : "password"}
      variant="outlined"
      label={label}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOffRoundedIcon />
              ) : (
                <VisibilityRoundedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
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
      sx={{
        ".MuiSvgIcon-root ": {
          fill: "#660090",
        },
      }}
    />
  );
}

export default Input;
