"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function GenderSelector({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Gender</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Gender"
      >
        <MenuItem value="Gender Neutral">Gender Neutral</MenuItem>
        <MenuItem value="Female">Female Only</MenuItem>
      </Select>
    </FormControl>
  );
}