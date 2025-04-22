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
            "linear-gradient(135deg, #FF9900 0%,#6C10BC 28%,#401565 50%,#41007A 59%,#5F15A0 64%,#310756 80%,#52118B 86%,#6C10BC 94%)",
        }}
      >
        <Box
          sx={{
            py: 5,
            p: 3,
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
            {/* <Box sx={{ width: { xs: 120, sm: 200 }, visibility:'hidden' }}>
              <Image
                width={200}
                height={0}
                src={"/img/Vedam_Final_Logo_White.png"}
                alt="logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Box> */}
            <Box sx={{mt:7}}>
              <Typography sx={{ color: "#FFFFFF" }}>Most Accurate</Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", fontSize: { xs: 32, sm: 48 },color: "#FFFFFF" }}
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
                <Typography sx={{ display: "flex", color: "#FFFFFF" }}>
                  <VerifiedIcon />
                  Predict rank & college based on the obtained marks.
                </Typography>
                <Typography sx={{ display: "flex", color: "#37FF00" }}>
                  <VerifiedIcon />
                  No Hidden Charges, 100% Free
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" sx={{ fontSize: 14, mb: 1,color: "#FFFFFF" }}>
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
