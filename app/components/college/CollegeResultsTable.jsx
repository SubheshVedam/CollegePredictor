"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  Button,
  Modal,
  Box,
  Typography,

  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  Divider,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProgramDetails,
  setProgramDetailsModalOpen,
} from "../../../features/collegePredictor/collegePredictorSlice";
import LiquidGlassLoader from "../shared/LiquidGlassLoader";
import React, { useState } from "react";
import Image from "next/image";
import ErrorIcon from "@mui/icons-material/Error";
import AnnouncementBanner from "../AnnouncementBanner";
import {
  liquidIconButtonSx,
  smallPurpleLiquidButtonSx,
} from "../shared/liquidGlassStyles";

const interspersedMessages = [
  {
    text: "99% of the Engineers will fail the AI revolution! Are you prepared?",
    href: "https://tinyurl.com/collegepredictor-b6ytvideo",
    imgurl: "/img/AD01.jpeg",
  },
  {
    text: "VSAT: Your Gateway to Advanced Tech CS[AI] Program with 100% Scholarships!",
    href: "https://tinyurl.com/collegepredictor-b2-scholar",
    imgurl: "/img/AD02.jpg",
  },
  {
    text: "Top engineers from Google and Microsoft built this college with AI-first curriculum.",
    href: "https://tinyurl.com/collegepredictor-b8-techminds",
    imgurl: "/img/AD06.jpeg",
  },
  {
    text: "B.Tech in CS & AI that lets you build the next WhatsApp, not just study it.",
    href: "https://tinyurl.com/collegepredictor-b9-wapp",
    imgurl: "/img/AD03.jpeg",
  },
  {
    text: "No chemistry or Physics! Start coding from day 1!",
    href: "https://tinyurl.com/collegepredictor-b6nopcm",
    imgurl: "/img/AD04.jpeg",
  },
  {
    text: "50+ Real Projects. Build apps like Netflix, LinkedIn, Hotstar & more before you graduate.",
    href: "https://tinyurl.com/collegepredictor-b10-realproj",
    imgurl: "/img/AD10.jpg",
  },
  {
    text: "USPs",
    href: "https://tinyurl.com/collegepredictor-b5-usps",
    imgurl: "/img/AD08.jpeg",
  },
  {
    text: "Code over 1,00,000+ lines during your journey here.",
    href: "https://tinyurl.com/collegepredictor-b1-code",
    imgurl: "/img/AD05.jpg",
  },
  {
    text: "Prepare for the jobs of 2029 and beyond with an AI-first curriculum.",
    href: "https://tinyurl.com/collegepredictor-b3-jobs2029",
    imgurl: "/img/AD09.jpg",
  },
];
const interspersedMessagesMobile = [
  {
    text: "99% of the Engineers will fail the AI revolution! Are you prepared?",
    href: "https://tinyurl.com/collegepredictor-b6ytvideo",
    imgurl: "/img/AD01_Mobile.jpg",
  },
  {
    text: "VSAT: Your Gateway to Advanced Tech CS[AI] Program with 100% Scholarships!",
    href: "https://tinyurl.com/collegepredictor-b2-scholar",
    imgurl: "/img/AD02_Mobile.jpeg",
  },
  {
    text: "Top engineers from Google and Microsoft built this college with AI-first curriculum.",
    href: "https://tinyurl.com/collegepredictor-b8-techminds",
    imgurl: "/img/AD06_Mobile.jpg",
  },
  {
    text: "B.Tech in CS & AI that lets you build the next WhatsApp, not just study it.",
    href: "https://tinyurl.com/collegepredictor-b9-wapp",
    imgurl: "/img/AD03_Mobile.jpg",
  },
  {
    text: "No chemistry or Physics! Start coding from day 1!",
    href: "https://tinyurl.com/collegepredictor-b6nopcm",
    imgurl: "/img/AD04_Mobile.jpg",
  },
  {
    text: "50+ Real Projects. Build apps like Netflix, LinkedIn, Hotstar & more before you graduate.",
    href: "https://tinyurl.com/collegepredictor-b10-realproj",
    imgurl: "/img/AD10_Mobile.jpg",
  },
  {
    text: "USPs",
    href: "https://tinyurl.com/collegepredictor-b5-usps",
    imgurl: "/img/AD08_Mobile.jpg",
  },
  {
    text: "Code over 1,00,000+ lines during your journey here.",
    href: "https://tinyurl.com/collegepredictor-b1-code",
    imgurl: "/img/AD05_Mobile.jpeg",
  },
  {
    text: "Prepare for the jobs of 2029 and beyond with an AI-first curriculum.",
    href: "https://tinyurl.com/collegepredictor-b3-jobs2029",
    imgurl: "/img/AD09_Mobile.jpeg",
  },
];

const adPositioningMob = [0, 4, 8, 12, 16, 20, 24, 28, 32];
const adPositioning = [0, 2, 4, 6, 8, 10, 12, 14, 16];

const glassTableContainerSx = {
  mt: 3,
  borderRadius: "28px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.28)",
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(237, 233, 254, 0.42))",
  backdropFilter: "saturate(180%) blur(24px)",
  WebkitBackdropFilter: "saturate(180%) blur(24px)",
  boxShadow: "0 24px 60px rgba(42, 19, 91, 0.16)",
};

const glassTableHeadCellSx = {
  color: "white",
  fontWeight: 700,
  borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
  background:
    "linear-gradient(135deg, rgba(42, 19, 91, 0.9), rgba(108, 16, 188, 0.82))",
};

const glassBodyCellSx = {
  borderBottom: "1px solid rgba(255, 255, 255, 0.22)",
  color: "#24123f",
  backgroundColor: "transparent",
};

const glassInstituteCellSx = {
  ...glassBodyCellSx,
  fontWeight: "bold",
  verticalAlign: "top",
  fontSize: 20,
  textWrap: "pretty",
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.54), rgba(254, 229, 205, 0.36))",
};

const glassDetailButtonSx = {
  ...smallPurpleLiquidButtonSx,
  px: 1.5,
  py: 0.55,
  background:
    "radial-gradient(150% 140% at 0% 20%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 56%), linear-gradient(125deg, rgba(136,56,214,0.24) 0%, rgba(170,110,236,0.18) 42%, rgba(251,127,5,0.14) 100%), rgba(255,255,255,0.12)",
  backdropFilter: "blur(16px) saturate(185%)",
  WebkitBackdropFilter: "blur(16px) saturate(185%)",
  boxShadow:
    "inset 0 1px 3px rgba(255,255,255,0.38), inset 0 -3px 6px rgba(31,10,59,0.08), 0 8px 18px -12px rgba(42,19,91,0.22)",
  "&:hover": {
    ...smallPurpleLiquidButtonSx["&:hover"],
    background:
      "radial-gradient(150% 150% at 10% 20%, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0) 60%), linear-gradient(125deg, rgba(136,56,214,0.3) 0%, rgba(190,136,244,0.22) 48%, rgba(251,127,5,0.16) 100%), rgba(255,255,255,0.16)",
    boxShadow:
      "inset 0 2px 5px rgba(255,255,255,0.48), inset 0 -3px 6px rgba(31,10,59,0.08), 0 12px 22px -14px rgba(42,19,91,0.26)",
  },
};

const liquidQuotaChipSx = {
  position: "relative",
  overflow: "hidden",
  height: 28,
  fontWeight: 700,
  letterSpacing: "0.03em",
  color: "white",
  background:
    "radial-gradient(140% 120% at 0% 20%, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0) 55%), linear-gradient(125deg, rgba(136,56,214,0.82) 0%, rgba(251,127,5,0.62) 100%), rgba(108,16,188,0.76)",
  backdropFilter: "blur(14px) saturate(190%)",
  WebkitBackdropFilter: "blur(14px) saturate(190%)",
  boxShadow:
    "inset 0 1px 3px rgba(255,255,255,0.36), inset 0 -3px 6px rgba(31,10,59,0.14), 0 8px 18px -12px rgba(76,29,149,0.28)",
  "& .MuiChip-label": {
    px: 1.1,
    position: "relative",
    zIndex: 1,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    height: "55%",
    borderRadius: "inherit",
    background:
      "linear-gradient(rgba(255,255,255,0.52), rgba(255,255,255,0.04))",
    opacity: 0.5,
    pointerEvents: "none",
  },
};

const glassMobileAccordionSx = {
  mb: 1.5,
  borderRadius: "22px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.26)",
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(237, 233, 254, 0.42))",
  backdropFilter: "saturate(180%) blur(22px)",
  WebkitBackdropFilter: "saturate(180%) blur(22px)",
  boxShadow: "0 18px 40px rgba(42, 19, 91, 0.12)",
  "&:before": {
    display: "none",
  },
  "&:first-of-type": {
    borderTopLeftRadius: "22px",
    borderTopRightRadius: "22px",
  },
  "&:last-of-type": {
    borderBottomLeftRadius: "22px",
    borderBottomRightRadius: "22px",
  },
};

const glassProgramCardSx = {
  p: 2,
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.54), rgba(254, 229, 205, 0.28))",
  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
};

const glassIconButtonSx = {
  ...liquidIconButtonSx,
  width: "34px",
  height: "34px",
  borderRadius: "12px",
  background:
    "radial-gradient(140% 120% at 0% 20%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 55%), linear-gradient(125deg, rgba(136,56,214,0.9), rgba(251,127,5,0.68))",
  boxShadow:
    "inset 0 1px 2px rgba(255,255,255,0.34), 0 10px 22px -12px rgba(76,29,149,0.32)",
  "&:hover": {
    background:
      "radial-gradient(140% 120% at 0% 20%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 55%), linear-gradient(125deg, rgba(150,76,224,0.95), rgba(251,127,5,0.74))",
  },
};

export default function CollegeResultsTable({ myRank, minRank, maxRank }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  const {
    results,
    isLoading,
    error,
    programDetails,
    programDetailsLoading,
    programDetailsError,
    programDetailsModalOpen,
  } = useSelector((state) => state.collegePredictor);

  const groupedResults = results.reduce((acc, result) => {
    const collegeKey = result.institute_id;
    if (!acc[collegeKey]) {
      acc[collegeKey] = {
        collegeName: result.institute_name,
        programs: [],
      };
    }
    acc[collegeKey].programs.push(result);
    return acc;
  }, {});

  const sortedColleges = Object.values(groupedResults)
    .map((college) => ({
      ...college,
      programs: college.programs.sort(
        (a, b) => a.closing_rank - b.closing_rank
      ),
    }))
    .sort((a, b) => {
      const aMin = Math.min(...a.programs.map((p) => p.closing_rank));
      const bMin = Math.min(...b.programs.map((p) => p.closing_rank));
      return aMin - bMin;
    });

  const handleViewDetails = (row) => {
    setSelectedProgram({
      collegeName: row.institute_name,
      programName: row.program_name,
      quota: row.sub_category,
      openingRank: row.opening_rank,
      closingRank: row.closing_rank,
    });
    dispatch(setProgramDetailsModalOpen(true));
    dispatch(
      fetchProgramDetails({
        instituteId: row.institute_id,
        programName: row.program_name,
        gender: row.gender,
        category: row.category,
        sub_category: row.sub_category,
      })
    );
  };

  const handleCloseModal = () => {
    dispatch(setProgramDetailsModalOpen(false));
    setSelectedProgram(null);
  };

  if (isLoading)
    return (
      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
      gap={2}
    >
      <LiquidGlassLoader size={56} />
      <Typography
        sx={{
          color: "rgba(255,255,255,0.88)",
          fontFamily: "var(--font-outfit), sans-serif",
          fontSize: 15,
        }}
      >
        Loading results…
      </Typography>
    </Box>
  );
  if (error)
    return (
    <Alert severity="error" className="my-4">
      {error}
    </Alert>
  );
  if (results.length === 0)
    return (
    <div className="text-center py-8 text-gray-500">
      <Box sx={{ width: "100%", height: "auto" }}>
        <Box
          className="glass-light"
          sx={{
            borderRadius: "20px",
            py: 2,
            mb: { xs: 5, sm: 10 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "1px solid rgba(255, 255, 255, 0.45)",
          }}
        >
          <ErrorIcon sx={{ color: "orange", fontSize: "50px", mb: 1 }} />
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 20 },
              textAlign: "center",
              width: "100%",
            }}
          >
            Sorry, Your Rank is not eligible for
            any&nbsp;NITs,&nbsp;IIITs&nbsp;or&nbsp;GFTIs
          </Typography>
        </Box>

        <a href="https://tinyurl.com/collegepredictor-b4" target="_blank" rel="noreferrer">
          <Image
            width={1500}
            height={500}
            src="/img/noResultAd.jpeg"
            alt="No Result"
            style={{ width: "100%", height: "100%" }}
          />
        </a>
      </Box>
    </div>
  );

  return (
    <Box sx={{ position: 'relative', pb: isMobile ? '120px' : '100px' }}>
    {!isMobile ? (
      <TableContainer component={Paper} elevation={0} sx={glassTableContainerSx}>
        <Table className="min-w-full">
          <TableHead>
            <TableRow>
              {[
                "Institute",
                "Program",
                "Opening Rank",
                "Closing Rank",
                "Quota",
                "",
              ].map((text, i) => (
                <TableCell
                  key={i}
                  sx={glassTableHeadCellSx}
                  align={i === 2 || i === 3 ? "right" : "left"}
                >
                  {text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedColleges.map((college, idx) => (
              <React.Fragment key={idx}>
                {college.programs.map((program, pIdx) => (
                  <TableRow
                    key={`${program.institute_id}-${pIdx}`}
                    sx={{
                      background:
                        pIdx % 2 === 0
                          ? "linear-gradient(135deg, rgba(108, 16, 188, 0.18), rgba(255, 255, 255, 0.22))"
                          : "linear-gradient(135deg, rgba(255, 255, 255, 0.46), rgba(254, 229, 205, 0.2))",
                    }}
                  >
                    {pIdx === 0 && (
                      <TableCell
                        rowSpan={college.programs.length}
                        sx={glassInstituteCellSx}
                      >
                        {college.collegeName}
                      </TableCell>
                    )}
                    <TableCell sx={glassBodyCellSx}>{program.program_name}</TableCell>
                    <TableCell sx={glassBodyCellSx} align="right">
                      {program.opening_rank}
                    </TableCell>
                    <TableCell sx={glassBodyCellSx} align="right">
                      {program.closing_rank}
                    </TableCell>
                    <TableCell sx={glassBodyCellSx}>
                      <Chip
                        label={program.sub_category}
                        size="small"
                        sx={liquidQuotaChipSx}
                      />
                    </TableCell>
                    <TableCell sx={glassBodyCellSx}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleViewDetails(program)}
                        sx={glassDetailButtonSx}
                      >
                        <Typography
                          sx={{
                            color: "#6C10BC",
                            textTransform: "capitalize",
                            fontSize: 14,
                          }}
                        >
                          Round&nbsp;Wise&nbsp;Details
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Inserting messages every 2 colleges */}
                {adPositioning.includes(idx) &&
                  (() => {
                    const adIndex = adPositioning.indexOf(idx);
                    const adData = interspersedMessages[adIndex];

                    if (!adData) return null;

                    return (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ p: 0 }}>
                          <a
                            href={adData.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              width={1500}
                              height={500}
                              src={adData.imgurl}
                              alt={adData.text}
                              loading="lazy"
                              style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                              }}
                            />
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })()}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Box mt={3}>
        {sortedColleges.map((college, idx) => (
          <React.Fragment key={idx}>
            <Accordion sx={glassMobileAccordionSx}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(108, 16, 188, 0.28), rgba(255, 255, 255, 0.3))",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{college.collegeName}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0, m: 0 }}>
                {college.programs.map((program, i) => (
                  <Box
                    key={`${college.collegeName}-${i}`}
                    sx={{
                      ...glassProgramCardSx,
                      background:
                        i % 2 === 0
                          ? "linear-gradient(135deg, rgba(108, 16, 188, 0.12), rgba(255, 255, 255, 0.18))"
                          : glassProgramCardSx.background,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: { xs: 12, sm: 16 }, fontWeight: 600 }}
                    >
                      {program.program_name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontSize: { xs: 12, sm: 16 } }}
                        >
                          <strong>OR:</strong> {program.opening_rank} |{" "}
                          <strong>CR:</strong> {program.closing_rank}
                        </Typography>
                        <Chip
                          label={program.sub_category}
                          size="small"
                          sx={{
                            ...liquidQuotaChipSx,
                            fontSize: { xs: 12, sm: 16 },
                          }}
                        />
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(program)}
                        sx={glassIconButtonSx}
                      >
                        <ArrowForwardIosIcon
                          fontSize="small"
                          sx={{ color: "#24123f" }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>

            {adPositioningMob.includes(idx) &&
              (() => {
                const adIndex = adPositioningMob.indexOf(idx);
                const adData = interspersedMessagesMobile[adIndex];

                if (!adData) return null;

                return (
                  <Box sx={{ width: "100%", height: "auto" }}>
                    <a
                      href={adData.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        width={1200}
                        height={400}
                        src={adData.imgurl}
                        alt={adData.text}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </a>
                  </Box>
                );
              })()}
          </React.Fragment>
        ))}
      </Box>
    )}

    {/* Fixed/Permanent Banner at the bottom with close button */}
    {showBanner && (
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
      }}>
        <AnnouncementBanner />
      </Box>
    )}

    {/* Modal for Program Details */}
    <Modal
      open={programDetailsModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="program-details-modal"
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
      <Box component="span" sx={{ outline: "none", display: "contents" }}>
        {/* Loader shown on backdrop (before modal content), not inside modal */}
        {programDetailsLoading && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: (theme) => theme.zIndex.modal + 1,
              pointerEvents: "none",
            }}
          >
            <LiquidGlassLoader size={56} />
          </Box>
        )}

        {/* Modal content box: only show when not loading */}
        {!programDetailsLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", md: "40%" },
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.78), rgba(254, 229, 205, 0.52))",
              backdropFilter: "saturate(180%) blur(36px)",
              WebkitBackdropFilter: "saturate(180%) blur(36px)",
              boxShadow: "0 28px 80px rgba(42, 19, 91, 0.18)",
              p: 3,
              pt: 2,
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.32)",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Box display="flex" justifyContent="flex-end" sx={{ p: 0, m: 0 }}>
              <IconButton onClick={handleCloseModal} sx={{ p: 0, m: 0 }}>
                <CloseIcon sx={{ p: 0, m: 0 }} />
              </IconButton>
            </Box>

            {selectedProgram && (
              <Box mb={3}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: { xs: 12, sm: 16 },
                    fontWeight: 500,
                    color: "#848484",
                  }}
                >
                  {selectedProgram.collegeName}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: 14, sm: 20 }, fontWeight: 600 }}
                >
                  {selectedProgram.programName}
                </Typography>
                <Divider sx={{ my: { xs: 1, sm: 2 } }} />
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: { xs: 12, sm: 16 }, fontWeight: 500 }}
                >
                  Round-wise Yearly Closing Ranks
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontSize: { xs: 12, sm: 16 }, fontWeight: 350 }}
                >
                  Your JEE Main Rank -&nbsp;
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {minRank && maxRank ? `${minRank} - ${maxRank}` : myRank}
                  </span>
                </Typography>
              </Box>
            )}

            {programDetailsError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {programDetailsError}
          </Alert>
        )}

        {programDetails && (
          <>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                ...glassTableContainerSx,
                mt: 1,
                borderRadius: "20px",
                boxShadow: "0 18px 40px rgba(42, 19, 91, 0.12)",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={glassTableHeadCellSx}
                    >
                      Round
                    </TableCell>
                    <TableCell
                      sx={glassTableHeadCellSx}
                      align="right"
                    >
                      Opening Rank'24
                    </TableCell>
                    <TableCell
                      sx={glassTableHeadCellSx}
                      align="right"
                    >
                      Closing Rank'24
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {programDetails.map((detail, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        background:
                          i % 2 === 0
                            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.48), rgba(237, 233, 254, 0.22))"
                            : "linear-gradient(135deg, rgba(254, 229, 205, 0.24), rgba(255, 255, 255, 0.4))",
                      }}
                    >
                      <TableCell sx={glassBodyCellSx}>
                        {detail.round}
                      </TableCell>
                      <TableCell
                        sx={glassBodyCellSx}
                        align="right"
                      >
                        {detail.opening_rank}
                      </TableCell>
                      <TableCell
                        sx={glassBodyCellSx}
                        align="right"
                      >
                        {detail.closing_rank}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
          </Box>
        )}
      </Box>
    </Modal>
  </Box>
);
}