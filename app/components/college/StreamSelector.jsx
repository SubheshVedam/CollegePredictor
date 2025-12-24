"use client";
import { FormControl, Select, Box, Typography, MenuItem } from "@mui/material";

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
        component="h3"
        sx={{
          color: 'white',
          fontSize: { xs: 14, sm: 16 }
        }}
      >
        Preferred Stream
      </Typography>
      
      <FormControl fullWidth>
        <Select
          value={value || 'PCM'}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: 'grey.300',
                borderRadius: 2
              },
              "&:hover fieldset": {
                borderColor: 'primary.main',
              },
              "&.Mui-focused fieldset": {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
            },
            "& .MuiSelect-select": {
              py: 1.5,
              fontWeight: 'normal',
              fontSize: '1rem',
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

