"use client";
import { FormControl, Select, Box, Typography, MenuItem } from "@mui/material";
import {
  liquidFieldSx,
  liquidFormLabelSx,
  liquidMenuProps,
} from "../shared/liquidGlassStyles";

export default function YearSelector({ value, onChange }) {
  const years = [ "2026","2025","2024 or Before"];

  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        mb: 1
      }}
    >
      <Typography 
        variant="subtitle1" 
        component="p"
        sx={liquidFormLabelSx}
      >
        12th Passout Year
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
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
