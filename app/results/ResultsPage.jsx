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

  Alert,
  Paper,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import useUtmTracking from "@/hooks/useUtmTracking";
import ShareButtons from "../components/shared/ShareButton";
import {
  liquidPanelDarkSx,
  orangeLiquidButtonSx,
  purpleLiquidButtonSx,
} from "../components/shared/liquidGlassStyles";
import LiquidGlassProgress from "../components/shared/LiquidGlassProgress";

const modalStyle = {
  ...liquidPanelDarkSx,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: "70%" },
  maxWidth: "500px",
  p: 4,
  borderRadius: 3,
  maxHeight: "90vh",
  overflowY: "auto",
};

const glassMetaPillSx = {
  position: "relative",
  overflow: "hidden",
  width: "82%",
  px: 2,
  py: 1.1,
  borderRadius: "20px",
  color: "white",
  background:
    "radial-gradient(140% 120% at 0% 20%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 55%), linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08)), rgba(255,255,255,0.1)",
  backdropFilter: "blur(18px) saturate(190%)",
  WebkitBackdropFilter: "blur(18px) saturate(190%)",
  boxShadow:
    "inset 0 1px 3px rgba(255,255,255,0.28), inset 0 -4px 8px rgba(0,0,0,0.12), 0 12px 22px -12px rgba(0,0,0,0.28)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    height: "52%",
    borderRadius: "inherit",
    background:
      "linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.04))",
    opacity: 0.55,
    pointerEvents: "none",
  },
};

export default function ResultsPage() {
  useUtmTracking();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { results, isLoading, error, isVerified, showOtpModal, phoneNumber } =
    useSelector((state) => state.collegePredictor);

  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  // Drive progress 0 → 90% while loading
  useEffect(() => {
    if (!isLoading) return;
    setShowContent(false);
    setProgress(0);
    const duration = 2500;
    const steps = 45;
    const stepMs = duration / steps;
    const stepValue = 90 / steps;
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      setProgress((p) => Math.min(90, p + stepValue));
      if (step >= steps) clearInterval(id);
    }, stepMs);
    return () => clearInterval(id);
  }, [isLoading]);

  // When loading finishes: go to 100% then reveal content
  useEffect(() => {
    if (isLoading) return;
    setProgress(100);
    const t = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(t);
  }, [isLoading]);

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

  if (!showContent) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          px: 3,
        }}
      >
        <Typography
          sx={{
            color: "rgba(255,255,255,0.9)",
            fontSize: { xs: 16, sm: 18 },
            mb: 3,
            fontFamily: "var(--font-outfit), sans-serif",
          }}
        >
          Finding your colleges…
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 360 }}>
          <LiquidGlassProgress progress={progress} height={14} />
        </Box>
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
              ...orangeLiquidButtonSx,
              textTransform: "none",
              border: "none",
              boxShadow:
                "inset 0 2px 5px rgba(255,255,255,0.58), inset 0 -4px 8px rgba(120,52,0,0.22), 0 10px 25px -8px rgba(0,0,0,0.4)",
              "&:hover": {
                ...orangeLiquidButtonSx["&:hover"],
                border: "none",
                boxShadow:
                  "inset 0 3px 8px rgba(255,255,255,0.78), inset 0 -4px 8px rgba(120,52,0,0.16), 0 18px 30px -10px rgba(0,0,0,0.5)",
              },
            }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleOpenSearchModal}
            sx={{ ...purpleLiquidButtonSx, textTransform: "none" }}
          >
            New Search
          </Button>
        </Box>

        {/* title area  */}
        <Box
          className="glass-light"
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
              gap: 2
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
            <ShareButtons variant="monochromeGlass" />

          </Box>

          {/* Image Section - Modified for mobile */}
          <Box
            className="glass-dark"
            sx={{
              display: "flex",
              minWidth: "30%",
              flexDirection: { xs: "row", sm: "column" },
              py: 1,
              px:2,
              borderRadius: "20px 20px 20px 20px",
            }}
          >
            {/* Foreground content */}
            <Box
              sx={{
                zIndex: 2,
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Box sx={glassMetaPillSx}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    zIndex: 1,
                    color: "white",
                    fontSize: { xs: 12, sm: 16 },
                  }}
                >
                  Category:&nbsp;
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, letterSpacing: "0.02em" }}
                  >
                    {searchParams.get("category")}
                  </Box>
                </Typography>
              </Box>
              <Box sx={glassMetaPillSx}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    zIndex: 1,
                    color: "white",
                    textAlign: "left",
                    fontSize: { xs: 12, sm: 15 },
                  }}
                >
                  JEE Main 2026 Rank:&nbsp;
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, letterSpacing: "0.02em" }}
                  >
                    {searchParams.get("minRank") && searchParams.get("maxRank")
                      ? `${searchParams.get("minRank")} - ${searchParams.get("maxRank")}`
                      : searchParams.get("rank")}
                  </Box>
                </Typography>
              </Box>
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
          <Paper
            elevation={0}
            className="glass-light"
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 4,
              border: "1px solid rgba(255, 255, 255, 0.45)",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Please complete OTP verification to view results
            </Typography>
          </Paper>
        )}

        <Modal
          open={openSearchModal}
          onClose={handleCloseSearchModal}
          aria-labelledby="college-search-modal"
          slotProps={{
            backdrop: {
              sx: {
                backdropFilter: "saturate(120%) blur(12px)",
                WebkitBackdropFilter: "saturate(120%) blur(12px)",
                backgroundColor: "rgba(42, 19, 91, 0.35)",
              },
            },
          }}
        >
          <Box sx={modalStyle}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              fontWeight="bold"
              sx={{ color: "white" }}
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
