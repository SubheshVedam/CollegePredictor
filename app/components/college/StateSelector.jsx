"use client";
import { FormControl, Select, Box, Typography, MenuItem } from "@mui/material";
import { stateOptions } from "@/lib/states";
import {
  liquidFieldSx,
  liquidFormLabelSx,
  liquidMenuProps,
} from "../shared/liquidGlassStyles";

export default function StateSelector({ value, onChange }) {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        mb: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        component="p"
        sx={liquidFormLabelSx}
      >
        Domicile State{" "}
      </Typography>

      <FormControl fullWidth>
        <Select
          variant="outlined"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          MenuProps={liquidMenuProps}
          sx={{
            ...liquidFieldSx,
            "& .MuiSelect-select": {
              ...liquidFieldSx["& .MuiInputBase-input, & .MuiSelect-select"],
              py: 1.5,
              color: value === "" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.96)",
              opacity: 1,
            },
          }}
        >
          <MenuItem value="" disabled>
            Select State
          </MenuItem>
          {stateOptions.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
