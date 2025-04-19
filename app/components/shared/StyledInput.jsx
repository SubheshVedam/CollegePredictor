"use client";
import { TextField, Typography } from "@mui/material";

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
    <div style={{ marginBottom: "1rem" }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        inputProps={inputProps}
        InputProps={{
          startAdornment,
        }}
        sx={{
          bgcolor : "white",
          borderRadius: "10px", // Border radius 10px
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        }}
        {...rest}
      />
      <Typography variant="caption" color="error">{helperText}</Typography>
    </div>
  );
}
