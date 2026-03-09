"use client";
import { FormControl, Select, Box, Typography, MenuItem } from "@mui/material";
import {
  liquidFieldSx,
  liquidFormLabelSx,
  liquidMenuProps,
} from "../shared/liquidGlassStyles";

export default function StreamSelector({ value, onChange }) {
  const streams = [
    "PCM",
    "PCB",
    "Others",
  ];

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
        Preferred Stream
      </Typography>
      
      <FormControl fullWidth>
        <Select
          variant="outlined"
          value={value || 'PCM'}
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
          {streams.map((stream) => (
            <MenuItem key={stream} value={stream}>
              {stream}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
