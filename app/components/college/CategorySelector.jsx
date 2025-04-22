"use client";
import { FormControl, Select, Box, Typography, MenuItem } from "@mui/material";

export default function CategorySelector({ value, onChange }) {
  const categories = [
    "OPEN", "OPEN (PwD)", "EWS", "OBC-NCL", "SC", "ST",
    "OBC-NCL (PwD)", "SC (PwD)", "EWS (PwD)", "ST (PwD)",
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
          color: 'white'   ,
                 fontSize:{xs:14,sm:16}

        }}
      >
        Select Category
      </Typography>
      
      <FormControl fullWidth>
        <Select
          value={value}
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
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}