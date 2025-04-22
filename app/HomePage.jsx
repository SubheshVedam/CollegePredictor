"use client";

import CollegeSearchForm from "./components/college/CollegeSearchForm";
import JEERankPredictorInfo from "./components/JEERankPredictorInfo";
import { Box, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import Image from "next/image";

export default function CollegePredictorPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          py: { xs: 0, sm: 10 },
          flexDirection: { xs: "column", sm: "row" },
          height: { xs: "auto", sm: "80vh" },
          background:
            "linear-gradient(-45deg, #FF9900 0%,#6C10BC 28%,#401565 50%,#41007A 59%,#5F15A0 64%,#310756 80%,#52118B 86%,#6C10BC 94%)",
        }}
      >
        <Box
          sx={{
            py: 5,
            p: 2,
            flex: 1,
            pl: { xs: "none", sm: "10%", lg: "20%" },
            background: "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 5,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ mt: { xs: 2, sm: 7 } }}>
              <Typography
                sx={{ color: "#FFFFFF", fontSize: { xs: 18, sm: 24 } }}
              >
                Most Accurate
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "medium",
                  fontSize: { xs: 32, sm: 45 },
                  color: "#FFFFFF",
                }}
              >
                College{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(45deg, #F97D03 50%, #FFFFFF 100%)",
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
                <Typography sx={{ display: "flex", color: "#FFFFFF" }}>
                  <VerifiedIcon sx={{mr:1}}/>
                  Predict College based on JEE MAIN 2025 Rank
                </Typography>
                <Typography sx={{ display: "flex", color: "#37FF00" }}>
                  <VerifiedIcon sx={{mr:1}} />
                  No Hidden Charges, 100% Free
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: 14, mb: 1, color: "#FFFFFF" }}
                >
                  Developed By Experts working at
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                  {" "}
                  <Image
                    width={200}
                    height={40}
                    src={"/img/Google_Microsoft_with_White.png"}
                    alt="logo"
                  />{" "}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            py: 5,
            p: 2,
            pb: 4,
            pr: { xs: "none", sm: "10%", lg: "20%" },
            background: "transparent",
          }}
        >
          <CollegeSearchForm onSearchComplete={() => {}} />
        </Box>
      </Box>

      <JEERankPredictorInfo />
    </>
  );
}
