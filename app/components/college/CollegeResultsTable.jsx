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
  CircularProgress,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  Divider,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProgramDetails,
  setProgramDetailsModalOpen,
} from "../../redux/searchSlice";
import { useState } from "react";

export default function CollegeResultsTable({ myRank }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedProgram, setSelectedProgram] = useState(null);

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

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <Alert severity="error" className="my-4">
        {error}
      </Alert>
    );
  if (results.length === 0)
    return (
      <div className="text-center py-8 text-gray-500">No results found</div>
    );

  return (
    <>
      {!isMobile ? (
        <TableContainer component={Paper} className="mt-6 shadow-sm">
          <Table className="min-w-full">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#33005F" }}>
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
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      border: "1px solid #ccc",
                    }}
                    align={i === 2 || i === 3 ? "right" : "left"}
                  >
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedColleges.map((college) =>
                college.programs.map((program, idx) => (
                  <TableRow
                    key={`${program.institute_id}-${idx}`}
                    sx={{
                      backgroundColor:
                        idx % 2 === 0 ? "rgba(108, 16, 188, 0.2)" : "white",
                    }}
                  >
                    {idx === 0 && (
                      <TableCell
                        rowSpan={college.programs.length}
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "white",
                          verticalAlign: "top",
                          fontSize: 20,
                          textWrap: "pretty",
                          border: "1px solid #ccc",
                        }}
                      >
                        {college.collegeName}
                      </TableCell>
                    )}
                    <TableCell>{program.program_name}</TableCell>
                    <TableCell align="right">{program.opening_rank}</TableCell>
                    <TableCell align="right">{program.closing_rank}</TableCell>
                    <TableCell>
                      <Chip
                        label={program.sub_category}
                        size="small"
                        color={
                          program.sub_category === "HS"
                            ? "primary"
                            : "secondary"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleViewDetails(program)}
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box mt={3}>
          {sortedColleges.map((college, idx) => (
            <Accordion key={idx} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ backgroundColor: "rgba(108, 16, 188, 0.3)" }}
              >
                <Typography>{college.collegeName}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0, m: 0 }}>
                {college.programs.map((program, i) => (
                  <Box
                    key={`${college.collegeName}-${i}`}
                    sx={{
                      backgroundColor: i % 2 === 0 ? "#ede9fe" : "#fff",
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: { xs: 12, sm: 16 } }}
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
                          color={"secondary"}
                          sx={{ fontSize: { xs: 12, sm: 16 } }}
                        />
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(program)}
                        sx={{
                          backgroundColor: "lightgray",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          width: "32px",
                          height: "32px",
                          padding: 0,
                        }}
                      >
                        <ArrowForwardIosIcon
                          fontSize="small"
                          sx={{ color: "black" }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {/* Modal for Program Details */}
      <Modal
        open={programDetailsModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="program-details-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", md: "40%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            pt:2,
            borderRadius: 2,
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
                <span style={{ color: "#FFA41A", fontWeight: "bold" }}>
                  {myRank}
                </span>
              </Typography>
            </Box>
          )}

          {programDetailsLoading && (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
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
                sx={{ mt: 1, borderRadius: "16px" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#7e22ce" }}>
                      <TableCell
                        sx={{
                          color: "white",
                          border: "1px solid #ccc",
                        }}
                      >
                        Round
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          border: "1px solid #ccc",
                        }}
                        align="right"
                      >
                        Opening Rank'24
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          border: "1px solid #ccc",
                        }}
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
                          backgroundColor: "white",
                        }}
                      >
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          {detail.round}
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid #ccc" }}
                          align="right"
                        >
                          {detail.opening_rank}
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid #ccc" }}
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
      </Modal>
    </>
  );
}
