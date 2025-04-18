"use client";
import { TextField, MenuItem } from "@mui/material";

const genders = ["Gender Neutral", "Female"];

export default function GenderSelector({ value = "Gender Neutral", onChange }) {
  return (
    <TextField
      select
      fullWidth
      label="Gender"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {genders.map((gender) => (
        <MenuItem key={gender} value={gender}>
          {gender}
        </MenuItem>
      ))}
    </TextField>
  );
}