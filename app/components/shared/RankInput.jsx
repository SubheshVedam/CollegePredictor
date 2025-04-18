"use client";
import { TextField } from "@mui/material";

export default function RankInput({ value = "", onChange }) {
  return (
    <TextField
      fullWidth
      type="number"
      label="Rank"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{ min: 1 }}
    />
  );
}