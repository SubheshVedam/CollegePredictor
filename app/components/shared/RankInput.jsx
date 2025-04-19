"use client";
import { TextField } from "@mui/material";

export default function RankInput({ value, onChange }) {
  return (
    <TextField
      fullWidth
      label="JEE Rank"
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small" // or "medium"
      placeholder="Enter your JEE Main rank"
      inputProps={{
        min: "1",
        inputMode: "numeric",
        pattern: "[0-9]*",
      }}
      sx={{
        marginBottom: 2,
        "& .MuiInputLabel-root": {
          color: "text.secondary",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: 1, // theme shape.borderRadius
          "&.Mui-focused fieldset": {
            borderWidth: 1,
          },
        },
      }}
    />
  );
}
