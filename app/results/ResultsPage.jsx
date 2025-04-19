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
} from "../redux/searchSlice";
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
        success: (data) => {
          console.log("Verification success:", data);
          sessionStorage.setItem("isVerified", "true");
          handleOtpVerificationSuccess();
        },
        failure: (error) => {
          console.error("Verification failed:", error);
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
    const stateId = searchParams.get("stateId");

    if (rank && gender && category && stateId) {
      const verified = sessionStorage.getItem("isVerified") === "true";
      dispatch(setIsVerified(verified));

      if (!verified) {
        dispatch(setShowOtpModal(true));
      } else {
        dispatch(fetchCollegeResults({ rank, gender, category, stateId }));
      }
    }
  }, [searchParams, dispatch]);

  const handleOpenSearchModal = () => setOpenSearchModal(true);
  const handleCloseSearchModal = () => setOpenSearchModal(false);

  const addOrdinalSuffix = (n) => {
    const j = n % 10;
    const k = n % 100;
    let suffix = "th";

    if (j === 1 && k !== 11) suffix = "st";
    else if (j === 2 && k !== 12) suffix = "nd";
    else if (j === 3 && k !== 13) suffix = "rd";

    return (
      <>
        {n}
        <sup>{suffix}</sup>
      </>
    );
  };

  const handleOtpVerificationSuccess = () => {
    sessionStorage.setItem("isVerified", "true");
    dispatch(setIsVerified(true));
    dispatch(setShowOtpModal(false));

    const rank = searchParams.get("rank");
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const stateId = searchParams.get("stateId");
    dispatch(fetchCollegeResults({ rank, gender, category, stateId }));
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
              gap: 2, // spacing between text and image
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
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#FB7F05",
                  fontWeight: "bold",
                  fontSize: { xs: 22, sm: 36 },
                }}
              >
                College Predictor
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#6D1D59",
                  fontSize: { xs: 12, sm: 18 },
                  fontWeight: "bold",
                }}
              >
                Category:{" "}
                <span style={{ color: "black", fontWeight: "normal" }}>
                  {searchParams.get("category")}
                </span>
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#6D1D59",
                  fontSize: { xs: 12, sm: 18 },
                  fontWeight: "bold",
                }}
              >
                JEE Main 2025 Rank:{" "}
                <span style={{ color: "black", fontWeight: "normal" }}>
                  {searchParams.get("rank")}
                </span>
              </Typography>
            </Box>

            {/* Image Section */}
            <Box
              sx={{
                flex: 1,
                position: "relative",
                borderRadius: "16px",
                height: { xs: 120, sm: 200 },
                width: "100%",
                maxWidth: 400,
              }}
            >
              <Image
                src="/img/rankBg.webp"
                alt="Rank Background"
                fill
                style={{ objectFit: "contain", borderRadius: "16px" }}
                priority
              />

              {/* Foreground content */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "orange",
                    fontWeight: "bold",
                    mb: 1,
                    fontSize: { xs: 24, sm: 32 },
                  }}
                >
                  {addOrdinalSuffix(searchParams.get("rank"))}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontSize: { xs: 12, sm: 16 },
                    maxWidth: 300,
                  }}
                >
                  Expected Rank According <br />
                  to Your JEE MAIN 2025 Marks
                </Typography>
              </Box>
            </Box>
          </Box>

          {isVerified ? (
            <CollegeResultsTable
              results={results}
              myRank={searchParams.get("rank")}
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
            open={showOtpModal}
            onClose={() => dispatch(setShowOtpModal(false))}
            phoneNumber={phoneNumber}
            onPhoneNumberChange={handlePhoneNumberChange}
          />
        </Container>
      </Box>
  );
}
