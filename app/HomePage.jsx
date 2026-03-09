"use client";

import CollegeSearchForm from "./components/college/CollegeSearchForm";
import JEERankPredictorInfo from "./components/JEERankPredictorInfo";
import { Box, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import Image from "next/image";
import useUtmTracking from "../hooks/useUtmTracking";
import { useEffect } from "react";
import { getStoredUtmParams } from "../utils/utm";

export default function CollegePredictorPage() {
  // Use the UTM tracking hook to track page views with UTM parameters
  useUtmTracking();
  
  // Log UTM parameters for debugging (optional, can be removed in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const utmParams = getStoredUtmParams();
      if (Object.keys(utmParams).length > 0) {
        console.log('UTM Parameters:', utmParams);
      }
    }
  }, []);
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          py: { xs: 0, sm: 10 },
          flexDirection: { xs: "column", sm: "row" },
          minHeight: { xs: "auto", sm: "80vh" },
          height: { xs: "auto", sm: "auto" },
          width: "100%",
          maxWidth: "100vw",
          boxSizing: "border-box",
          background:
            "linear-gradient(-45deg, #FF9900 0%,#6C10BC 28%,#401565 50%,#41007A 59%,#5F15A0 64%,#310756 80%,#52118B 86%,#6C10BC 94%)",
          position: "relative",
          overflow: "hidden",
          alignItems: { xs: "stretch", sm: "stretch" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: 10, sm: 20 },
            left: { xs: -8, sm: 20 },
            zIndex: 1,
            pl: { xs: -2, sm: 0 }
          }}
        >
          <Image
            width={150}
            height={45}
            src="/img/Vedam_Final_Logo_White.png"
            alt="Vedam Logo"
            title="Vedam School of Technology"
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box
          sx={{
            // width: "100%",
            maxWidth: 1024,
            margin: "0 auto",
            my: { xs: 2, sm: 3 },
            px: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flex: 1,
            minWidth: 0,
            pt: { xs: 0, sm: 0 },
            alignItems: { xs: "center", sm: "stretch" },
          }}
        >
        <Box
          sx={{
            py: 5,
            p: { xs: 0, sm: 2 },
            flex: { xs: "none", sm: "1 1 50%" },
            minWidth: 0,
            width: { xs: "100%", sm: "auto" },
            maxWidth: { xs: "calc(100vw - 20px)", sm: "none" },
            background: "transparent",
            mt: { xs: 13, sm: 6 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 5,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Box sx={{ mt: { xs: 0, sm: 7 }, width: "100%" }}>
              <Typography
                sx={{ color: "#FFFFFF", fontSize: { xs: 18, sm: 24 } }}
              >
                Most Accurate
              </Typography>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: "medium",
                  fontSize: { xs: 32, sm: 45 },
                  color: "#FFFFFF",
                }}
              >
                JEE Main 2026 College{" "}
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
                  Predict College based on JEE MAIN 2026 Rank
                </Typography>
                <Typography sx={{ display: "flex", color: "#37FF00" }}>
                  <VerifiedIcon sx={{mr:1}} />
                  No Hidden Charges, 100% Free
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 4, width: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", sm: "flex-start" } }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: 14, mb: 1, color: "#FFFFFF" }}
                >
                  Developed By Experts working at
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                  {" "}
                  <Image
                    width={200}
                    height={40}
                    src={"/img/Google_Microsoft_with_White.png"}
                    alt="logo"
                    title="Google and Microsoft"
                  />{" "}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className="glass-strong"
          sx={{
            flex: { xs: "none", sm: "1 1 50%" },
            width: { xs: "100%", sm: "auto" },
            maxWidth: { xs: "calc(100vw - 20px)", sm: "none" },
            mx: { xs: "auto", sm: 0 },
            pt: 5,
            p: 2,
            pb: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignSelf: { xs: "center", sm: "flex-start" },
            boxSizing: "border-box",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            component="h2"
            variant="h5"
            sx={{
              color: "#FFFFFF",
              fontWeight: "bold",
              mb: 2,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Start Your Prediction
          </Typography>
          <CollegeSearchForm onSearchComplete={() => {}} />
        </Box>
        </Box>
      </Box>

      <JEERankPredictorInfo />
    </>
  );
}
