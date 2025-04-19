"use client";

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProgramDetails,
  setProgramDetailsModalOpen
} from '../../redux/searchSlice';

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

  const loremTexts = [];

  const groupedResults = results.reduce((acc, result) => {
    const collegeKey = result.institute_id;
    if (!acc[collegeKey]) {
      acc[collegeKey] = {
        collegeName: result.institute_name,
        programs: []
      };
    }
    acc[collegeKey].programs.push(result);
    return acc;
  }, {});

  const sortedColleges = Object.values(groupedResults)
    .map(college => ({
      ...college,
      programs: college.programs.sort((a, b) => a.closing_rank - b.closing_rank)
    }))
    .sort((a, b) => {
      const aMin = Math.min(...a.programs.map(p => p.closing_rank));
      const bMin = Math.min(...b.programs.map(p => p.closing_rank));
      return aMin - bMin;
    });

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

  let collegeCount = 0;
  let textIndex = 0;

  return (
    <>
      <TableContainer component={Paper} className="mt-6 shadow-sm">
        <Table className="min-w-full">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#7e22ce' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Institute</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Program</TableCell>
              <TableCell 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderBottom: 'none'
                }} 
                colSpan={2}
              >Rank</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quota</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}></TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#7e22ce' }}>
              <TableCell sx={{ color: 'white' }}></TableCell>
              <TableCell sx={{ color: 'white' }}></TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'right' }}>Opening</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'right' }}>Closing</TableCell>
              <TableCell sx={{ color: 'white' }}></TableCell>
              <TableCell sx={{ color: 'white' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedColleges.flatMap((college, collegeIdx) => {
              const collegeId = college.programs[0].institute_id;
              const rowCount = college.programs.length;

              const collegeRows = college.programs.map((program, index) => (
                <TableRow
                  key={`${collegeId}-${index}`}
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#fce7f3' : 'white'
                  }}
                >{index === 0 ? (
                  <TableCell
                    rowSpan={rowCount}
                    sx={{
                      verticalAlign: 'middle',
                      fontWeight: 'bold',
                      backgroundColor: index % 2 === 0 ? '#fce7f3' : 'white'
                    }}
                  >{college.collegeName}</TableCell>
                ) : null}<TableCell>{program.program_name}</TableCell>
                <TableCell align="right">{program.opening_rank}</TableCell>
                <TableCell align="right">{program.closing_rank}</TableCell>
                <TableCell>
                  <Chip
                    label={program.sub_category}
                    size="small"
                    color={program.sub_category.includes('PwD') ? 'secondary' : 'primary'}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<InfoIcon />}
                    onClick={() => handleViewDetails(program)}
                  >View Details</Button>
                </TableCell>
                </TableRow>
              ));

              collegeCount++;

              if (collegeCount % 2 === 0 && textIndex < loremTexts.length) {
                collegeRows.push(
                  <TableRow key={`lorem-${textIndex}`}><TableCell colSpan={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontStyle: 'italic', py: 2 }}
                    >{loremTexts[textIndex++]}</Typography>
                  </TableCell></TableRow>
                );
              }

              return collegeRows;
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Program Details */}
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
            <Typography variant="h5" component="h2">Program Details</Typography>
            <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
          </Box>

          {programDetailsLoading && (
            <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>
          )}

          {programDetailsError && (
            <Alert severity="error" sx={{ mb: 3 }}>{programDetailsError}</Alert>
          )}

          {programDetails && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#7e22ce' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Round</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Opening Rank</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Closing Rank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {programDetails.map((detail, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        backgroundColor: i % 2 === 0 ? '#fce7f3' : 'white'
                      }}
                    ><TableCell>{detail.round}</TableCell>
                    <TableCell align="right">{detail.opening_rank}</TableCell>
                    <TableCell align="right">{detail.closing_rank}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Modal>
    </>
  );
}