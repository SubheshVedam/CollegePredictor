"use client";
import { FormControl, Select, Box, Typography, MenuItem } from "@mui/material";
import {
  liquidFieldSx,
  liquidFormLabelSx,
  liquidMenuProps,
} from "../shared/liquidGlassStyles";

export default function GenderSelector({ value, onChange }) {
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
        Seat Pool{" "}
      </Typography>

      <FormControl fullWidth>
        <Select
          variant="outlined"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          MenuProps={liquidMenuProps}
          sx={{
            ...liquidFieldSx,
            "& .MuiSelect-select": {
              ...liquidFieldSx["& .MuiInputBase-input, & .MuiSelect-select"],
              py: 1.5,
            },
          }}
        >
          <MenuItem value="Gender Neutral">Gender Neutral</MenuItem>
          <MenuItem value="Female">Female Only</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
