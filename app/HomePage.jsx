"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CollegeSearchForm from "./components/college/CollegeSearchForm";
import JEERankPredictorInfo from "./components/JEERankPredictorInfo";
import { Box, Container, Typography, Paper } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import Image from "next/image";

export default function CollegePredictorPage() {
  return (
    <Provider store={store}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            p: 3,
            flex: 1,
            pl: { xs: "none", sm: "10%", lg: "20%" },
            background: "linear-gradient(to right, #FF9900 0%, #6C10BC 100%)",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: { xs: 120, sm: 200 } }}>
              <Image
                width={200}
                height={110}
                src={"/img/Vedam_Final_Logo_White.png"}
                alt="logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            <Box>
              <Typography>JEE MAINS 2025</Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", fontSize: { xs: 32, sm: 48 } }}
              >
                College{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(45deg, #FF9900 50%, #FFFFFF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  Predictor
                </span>
              </Typography>
              <Box
                sx={{ gap: 2, display: "flex", flexDirection: "column", mt: 3 }}
              >
                <Typography sx={{ display: "flex" }}>
                  <VerifiedIcon />
                  Predict rank & college based on the obtained marks.
                </Typography>
                <Typography sx={{ display: "flex" }}>
                  <VerifiedIcon sx={{ color: "green" }} />
                  No Hidden Charges, 100% Free
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" sx={{ fontSize: 14, mb: 1 }}>
                  Developed By Experts working at
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                  {" "}
                  <Image
                    width={70}
                    height={25}
                    src={"/img/google.webp"}
                    alt="logo"
                  />{" "}
                  <Image
                    width={80}
                    height={25}
                    src={"/img/microsoft-logo.png"}
                    alt="logo"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 2,
            pb: 4,
            pr: { xs: "none", sm: "10%", lg: "20%" },
            background: {
              xs: "linear-gradient(to right, #FF9900 0%, #6C10BC 100%)",
              sm: "#6C10BC",
            },
          }}
        >
          <CollegeSearchForm onSearchComplete={() => {}} />
        </Box>
      </Box>

      <JEERankPredictorInfo />
    </Provider>
  );
}
