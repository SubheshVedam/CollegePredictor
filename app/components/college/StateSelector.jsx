"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { stateOptions } from "@/lib/states";

export default function StateSelector({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>State</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="State"
      >
        {stateOptions.map((state) => (
          <MenuItem key={state.id} value={state.id}>
            {state.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
