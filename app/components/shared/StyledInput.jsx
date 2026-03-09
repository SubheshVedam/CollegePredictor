"use client";
import { TextField, Typography, Box } from "@mui/material";
import { liquidFieldSx, liquidFormLabelSx } from "./liquidGlassStyles";

export default function StyledInput({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  inputProps = {},
  helperText,
  startAdornment = null,
  ...rest
}) {
  return (
    <Box sx={{ backgroundColor: "transparent", mb: 1 }}>
      <Typography
        variant="subtitle1"
        component="p"
        sx={{ ...liquidFormLabelSx, mb: 1 }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        size="medium"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        inputProps={inputProps}
        InputProps={{
          startAdornment,
        }}
        sx={{
          ...liquidFieldSx,
          "& .MuiInputBase-input": {
            ...liquidFieldSx["& .MuiInputBase-input, & .MuiSelect-select"],
            py: 1.5,
          },
        }}
        {...rest}
      />
      <Typography variant="caption" color="error">
        {helperText}
      </Typography>
    </Box>
  );
}
