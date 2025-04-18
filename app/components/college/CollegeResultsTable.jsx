"use client";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgramDetails, setProgramDetailsModalOpen } from '../../redux/searchSlice';
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
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

export default function CollegeResultsTable() {
  const dispatch = useDispatch();
  const { 
    results, 
    isLoading, 
    error,
    programDetails,
    programDetailsLoading,
    programDetailsError,
    programDetailsModalOpen
  } = useSelector((state) => state.collegePredictor);

  const handleViewDetails = (row) => {
    dispatch(fetchProgramDetails({
      instituteId: row.institute_id,
      programName: row.program_name,
      gender: row.gender,
      category: row.category,
      sub_category: row.sub_category
    }));
  };

  const handleCloseModal = () => {
    dispatch(setProgramDetailsModalOpen(false));
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <Alert severity="error" className="my-4">{error}</Alert>;
  if (results.length === 0) return <div className="text-center py-8 text-gray-500">No results found</div>;

  return (
    <>
      <TableContainer component={Paper} className="mt-6 shadow-sm">
        <Table className="min-w-full">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-bold">Institute</TableCell>
              <TableCell className="font-bold">Program</TableCell>
              <TableCell className="font-bold" align="right">Closing Rank</TableCell>
              <TableCell className="font-bold">Quota</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>{row.institute_name}</TableCell>
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
      </TableContainer>

      {/* Program Details Modal */}
      <Modal
        open={programDetailsModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="program-details-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', md: '70%' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" component="h2">
              Program Details
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

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
                    {programDetails.map((detail, i) => (
                      <TableRow key={i}>
                        <TableCell>{detail.round}</TableCell>
                        <TableCell align="right">{detail.opening_rank}</TableCell>
                        <TableCell align="right">{detail.closing_rank}</TableCell>
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