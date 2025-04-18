"use client";
import { TextField, MenuItem } from "@mui/material";

const categories = [
  "OPEN", "OPEN (PwD)", "EWS", "OBC-NCL", "SC", "ST",
  "OBC-NCL (PwD)", "SC (PwD)", "EWS (PwD)", "ST (PwD)",
];

export default function CategorySelector({ value = "OPEN", onChange }) {
  return (
    <TextField
      select
      fullWidth
      label="Category"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {categories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </TextField>
  );
}