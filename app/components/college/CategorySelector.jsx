"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CategorySelector({ value, onChange }) {
  const categories = [
    "OPEN", "OPEN (PwD)", "EWS", "OBC-NCL", "SC", "ST",
    "OBC-NCL (PwD)", "SC (PwD)", "EWS (PwD)", "ST (PwD)",
  ];

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Category"
        variant="outlined"
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}