"use client";
import { useState } from "react";
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
  TablePagination
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

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
  overflowY: "auto"
};

export default function CollegeResultsTable({ results }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [details, setDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  // Group rows by institute_name
  const groupedRows = results.reduce((acc, row) => {
    const key = row.institute_id;
    if (!acc[key]) {
      acc[key] = { name: row.institute_name, rows: [] };
    }
    acc[key].rows.push(row);
    return acc;
  }, {});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Flatten grouped rows for pagination
  const flattenedRows = Object.values(groupedRows).flatMap(group => group.rows);
  const paginatedRows = flattenedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} elevation={3} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="college results table">
          <TableHead sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Institute</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Program</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }} align="right">Closing Rank</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Quota</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={`${row.institute_id}-${index}`}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.institute_name}
                </TableCell>
                <TableCell>{row.program_name}</TableCell>
                <TableCell align="right">{row.closing_rank}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.sub_category} 
                    size="small"
                    color={row.sub_category.includes('PwD') ? 'secondary' : 'primary'}
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
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={flattenedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="program-details-modal"
        aria-describedby="program-details-description"
      >
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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
                    <TableCell align="right">Year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell>{d.round}</TableCell>
                      <TableCell align="right">{d.opening_rank}</TableCell>
                      <TableCell align="right">{d.closing_rank}</TableCell>
                      <TableCell align="right">{d.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}