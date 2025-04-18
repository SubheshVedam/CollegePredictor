"use client";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import CollegeSearchForm from "./CollegeSearchForm"; // Make sure to import your form component

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
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function CollegeResultsTable({
  results,
  onSearch,
  rank,
  setRank,
  gender,
  setGender,
  category,
  setCategory,
  stateId,
  setStateId,
}) {
  // Added onSearch prop
  const [selectedRow, setSelectedRow] = useState(null);
  const [details, setDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAgainModalOpen, setSearchAgainModalOpen] = useState(false); // New state for search again modal
  const [searchParams, setSearchParams] = useState({
    // State for search parameters
    rank: "",
    gender: "Gender Neutral",
    category: "OPEN",
    stateId: "",
  });
  const handleViewDetails = async (row) => {
    setSelectedRow(row);
    setOpenModal(true);
    setLoading(true);
    setError("");
    setDetails(null);

    try {
      const params = new URLSearchParams({
        institute_id: row.institute_id,
        program_name: row.program_name,
        gender: row.gender,
        category: row.category,
        sub_category: row.sub_category,
      });

      const res = await fetch(`/api/program-details?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch details");

      setDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAgain = () => {
    setSearchAgainModalOpen(true);
  };

  const handleSearchAgainSubmit = (newSearchParams) => {
    setSearchAgainModalOpen(false);
    setSearchParams(newSearchParams);
    onSearch(newSearchParams); // Call the parent component's search function
  };

  // Filter results based on search term
  const filteredResults = useMemo(() => {
    if (!searchTerm) return results;

    const lowerCaseSearch = searchTerm.toLowerCase();
    return results.filter(
      (row) =>
        row.institute_name.toLowerCase().includes(lowerCaseSearch) ||
        row.program_name.toLowerCase().includes(lowerCaseSearch) ||
        row.sub_category.toLowerCase().includes(lowerCaseSearch)
    );
  }, [results, searchTerm]);

  // Group rows by institute_name
  const groupedRows = filteredResults.reduce((acc, row) => {
    const key = row.institute_id;
    if (!acc[key]) {
      acc[key] = {
        name: row.institute_name,
        rows: [],
        rowCount: 0,
      };
    }
    acc[key].rows.push(row);
    acc[key].rowCount += 1;
    return acc;
  }, {});

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by institute, program or quota..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "350px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
            },
          }}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: "primary.main", color: "white" }}
          onClick={handleSearchAgain}
        >
          Search again!
        </Button>
      </Box>

      {/* Search Again Modal */}
      <Modal
        open={searchAgainModalOpen}
        onClose={() => setSearchAgainModalOpen(false)}
        aria-labelledby="search-again-modal"
      >
        <Box sx={modalStyle}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" component="h2">
              Refine Your Search
            </Typography>
            <IconButton onClick={() => setSearchAgainModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <CollegeSearchForm
            rank={rank}
            setRank={setRank}
            gender={gender}
            setGender={setGender}
            category={category}
            setCategory={setCategory}
            stateId={stateId}
            setStateId={setStateId}
            onSubmit={handleSearchAgainSubmit}
            isLoading={loading}
          />
        </Box>
      </Modal>

      <TableContainer component={Paper} elevation={3} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="college results table">
          <TableHead
            sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
          >
            <TableRow>
              <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                Institute
              </TableCell>
              <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                Program
              </TableCell>
              <TableCell
                sx={{ color: "common.white", fontWeight: "bold" }}
                align="right"
              >
                Closing Rank
              </TableCell>
              <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                Quota
              </TableCell>
              <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(groupedRows).length > 0 ? (
              Object.values(groupedRows).flatMap((group, groupIndex) => {
                const rows = group.rows.map((row, rowIndex) => (
                  <TableRow
                    key={`${row.institute_id}-${rowIndex}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {rowIndex === 0 ? (
                      <TableCell
                        component="th"
                        scope="row"
                        rowSpan={group.rowCount}
                        sx={{
                          verticalAlign: "top",
                          fontWeight: "bold",
                          backgroundColor: (theme) => theme.palette.grey[100],
                        }}
                      >
                        {group.name}
                      </TableCell>
                    ) : null}
                    <TableCell>{row.program_name}</TableCell>
                    <TableCell align="right">{row.closing_rank}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.sub_category}
                        size="small"
                        color={
                          row.sub_category.includes("PwD")
                            ? "secondary"
                            : "primary"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<InfoIcon />}
                        onClick={() => handleViewDetails(row)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ));

                // Add a full-width row after every 2 institutes
                if (groupIndex > 0 && (groupIndex + 1) % 2 === 0) {
                  return [
                    ...rows,
                    <TableRow key={`divider-${groupIndex}`}>
                      <TableCell
                        colSpan={5}
                        sx={{
                          backgroundColor: "#f5f5f5",
                          py: 3,
                          textAlign: "center",
                          fontStyle: "italic",
                          color: "text.secondary",
                        }}
                      >
                        <Box>Advertisement here </Box>
                      </TableCell>
                    </TableRow>,
                  ];
                }
                return rows;
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  {searchTerm
                    ? "No matching results found"
                    : "No data available"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Details */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="program-details-modal"
        aria-describedby="program-details-description"
      >
        <Box sx={modalStyle}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" component="h2">
              Program Details
            </Typography>
            <IconButton onClick={() => setOpenModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {selectedRow && (
            <>
              <Typography variant="body1" paragraph>
                <strong>Institute:</strong> {selectedRow.institute_name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Program:</strong> {selectedRow.program_name}
              </Typography>
              <Box display="flex" gap={2} mb={3}>
                <Chip label={`Gender: ${selectedRow.gender}`} />
                <Chip label={`Category: ${selectedRow.category}`} />
                <Chip label={`Quota: ${selectedRow.sub_category}`} />
              </Box>
            </>
          )}

          <Collapse in={loading}>
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          </Collapse>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {details && Array.isArray(details) && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Round</TableCell>
                    <TableCell align="right">Opening Rank</TableCell>
                    <TableCell align="right">Closing Rank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell>{d.round}</TableCell>
                      <TableCell align="right">{d.opening_rank}</TableCell>
                      <TableCell align="right">{d.closing_rank}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
