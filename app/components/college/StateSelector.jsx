"use client";
import { TextField, MenuItem } from "@mui/material";
import { stateOptions } from "@/lib/states";

export default function StateSelector({ value= "", onChange }) {
  return (
    <TextField
      select
      fullWidth
      label="State"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <MenuItem value="">Select State</MenuItem>
      {stateOptions.map((state) => (
        <MenuItem key={state.id} value={state.id}>
          {state.name}
        </MenuItem>
      ))}
    </TextField>
  );
}