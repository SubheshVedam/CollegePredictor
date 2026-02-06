"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCollegeResults,
  setIsVerified,
  setShowOtpModal,
  setPhoneNumber,
  setError,
} from "../../features/collegePredictor/collegePredictorSlice";
import CollegeResultsTable from "../components/college/CollegeResultsTable";
import CollegeSearchForm from "../components/college/CollegeSearchForm";
import OtpModal from "../components/otp/OtpModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Modal,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  Alert,
  Paper,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import useUtmTracking from "@/hooks/useUtmTracking";
import ShareButtons from "../components/shared/ShareButton";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: "70%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function ResultsPage() {
  useUtmTracking();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { results, isLoading, error, isVerified, showOtpModal, phoneNumber } =
    useSelector((state) => state.collegePredictor);

  const [openSearchModal, setOpenSearchModal] = useState(false);

  // Initialize Msg91 OTP widget
  useEffect(() => {
    if (showOtpModal && typeof window !== "undefined") {
      const configuration = {
        widgetId: process.env.NEXT_PUBLIC_MSG91_WIDGET_ID,
        tokenAuth: process.env.NEXT_PUBLIC_MSG91_AUTH_KEY,
        exposeMethods: true,
        success: () => {
          localStorage.setItem("isVerified", "true");
          handleOtpVerificationSuccess();
        },
        failure: () => {
          dispatch(setError("OTP verification failed. Please try again."));
        },
      };

      const script = document.createElement("script");
      script.src =
        "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";
      script.onload = () => {
        if (window.initSendOTP) {
          window.initSendOTP(configuration);
        }
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showOtpModal, dispatch]);

  useEffect(() => {
    const rank = searchParams.get("rank");
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const stream = searchParams.get("stream");
    const stateId = searchParams.get("stateId");

    if (rank && gender && category && stream && stateId) {
      const verified = localStorage.getItem("isVerified") === "true";
      dispatch(setIsVerified(verified));

      if (!verified) {
        dispatch(setShowOtpModal(true));
      } else {
        dispatch(fetchCollegeResults({ rank, gender, category, stream, stateId }));
      }
    }
  }, [searchParams, dispatch]);

  const handleOpenSearchModal = () => setOpenSearchModal(true);
  const handleCloseSearchModal = () => setOpenSearchModal(false);


  const handleOtpVerificationSuccess = () => {
    localStorage.setItem("isVerified", "true");
    dispatch(setIsVerified(true));
    dispatch(setShowOtpModal(false));

    const rank = searchParams.get("rank");
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const stream = searchParams.get("stream");
    const stateId = searchParams.get("stateId");
    dispatch(fetchCollegeResults({ rank, gender, category, stream, stateId }));
  };

  const handlePhoneNumberChange = (number) => {
    dispatch(setPhoneNumber(number));
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    dispatch(setShowOtpModal(true));
  }

  return (
    <Box
      sx={{
        position: "relative",
        filter: showOtpModal ? "blur(4px)" : "none",
        transition: "filter 0.3s ease",
      }}
    >
      <Backdrop
        open={showOtpModal}
        sx={{
          zIndex: (theme) => theme.zIndex.modal - 1,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* header buttons  */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/")}
            sx={{
              borderRadius: "12px",
              borderColor: "#FB7F05",
              fontSize: "clamp(10px, 2.5vw, 16px)",
              px: 2,
              textTransform: "none",
              color: "#FB7F05",
            }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleOpenSearchModal}
            sx={{
              fontSize: "clamp(10px, 2.5vw, 16px)",
              color: "#F9F9F9",
              background:
                "linear-gradient(95.22deg, #FB7F05 2.91%, #6C10BC 99.18%)",
              borderRadius: "12px",
              boxShadow: "0px 0px 11.2px rgba(255, 255, 255, 0.25)",
              textTransform: "capitalize",
            }}
          >
            New Search
          </Button>
        </Box>

        {/* title area  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            gap: 2,
            backgroundImage: 'url("/img/gridBg.svg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            py: { xs: 3, sm: 5 },
            borderRadius: 2,
          }}
        >
          {/* Text Section */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", sm: "left" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
              justifyContent: "center",
              gap:2
            }}
          >
            <Typography
              variant="h4"
              sx={{
                background:
                  "linear-gradient(95.22deg, #FB7F05 2.91%, #6C10BC 99.18%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontWeight: "500",
                fontSize: { xs: 28, sm: 38 },
              }}
            >
              College Predictor
            </Typography>
            <ShareButtons/>

          </Box>

          {/* Image Section - Modified for mobile */}
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", sm: "25%" },
              flexDirection: { xs: "row", sm: "column" },
              bgcolor: "#2a135b",
              py: 1,
              borderRadius: "100px 100px 100px 100px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.5)", // added bottom-only shadow
            }}
          >
            {/* Foreground content */}
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                justifyContent: "center",
                pl: { xs: 0, sm: 3 },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "white",
                  fontSize: { xs: 12, sm: 18 },
                }}
              >
                Category:&nbsp;{searchParams.get("category")}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "white",
                  textAlign: "left",
                  fontSize: { xs: 12, sm: 18 },
                }}
              >
                JEE Main 2026 Rank:&nbsp;
                {searchParams.get("minRank") && searchParams.get("maxRank") ? (
                  <span>
                    {searchParams.get("minRank")} - {searchParams.get("maxRank")}
                  </span>
                ) : (
                  searchParams.get("rank")
                )}
              </Typography>
            </Box>
          </Box>
        </Box>

        {isVerified ? (
          <CollegeResultsTable
            results={results}
            myRank={searchParams.get("rank")}
            minRank={searchParams.get("minRank")}
            maxRank={searchParams.get("maxRank")}
          />
        ) : (
          <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Please complete OTP verification to view results
            </Typography>
          </Paper>
        )}

        <Modal
          open={openSearchModal}
          onClose={handleCloseSearchModal}
          aria-labelledby="college-search-modal"
        >
          <Box sx={modalStyle}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              fontWeight="bold"
            >
              College Search
            </Typography>
            <CollegeSearchForm onSearchComplete={handleCloseSearchModal} />
          </Box>
        </Modal>

        <OtpModal
          router={router}
          open={showOtpModal}
          onClose={() => dispatch(setShowOtpModal(false))}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={handlePhoneNumberChange}
        />
      </Container>
    </Box>
  );
}
