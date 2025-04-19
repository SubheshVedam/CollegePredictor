"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CollegeSearchForm from "./components/college/CollegeSearchForm";
import JEERankPredictorInfo from "./components/JEERankPredictorInfo";
import { Box, Container, Typography, Paper } from "@mui/material";

export default function CollegePredictorPage() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            mb: 3,
          }}
        >
          College Predictor
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row", width: "100%" },
          }}
        >
          <Box sx={{ width: "50%" }}>
            
          </Box>
          <Box sx={{ width: "50%" }}>
            <CollegeSearchForm onSearchComplete={() => {}} />
          </Box>
        </Box>

        <JEERankPredictorInfo />
      </Container>
    </Provider>
  );
}
