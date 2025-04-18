"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCollegeResults } from '../redux/searchSlice';
import CollegeResultsTable from '../components/college/CollegeResultsTable';
import CollegeSearchForm from '../components/college/CollegeSearchForm';
import { Button, Modal, Box, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: '700px' },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '90vh',
  overflowY: 'auto'
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { results, isLoading, error } = useSelector((state) => state.collegePredictor);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const rank = searchParams.get('rank');
    const gender = searchParams.get('gender');
    const category = searchParams.get('category');
    const stateId = searchParams.get('stateId');

    if (rank && gender && category && stateId) {
      dispatch(fetchCollegeResults({ rank, gender, category, stateId }));
    }
  }, [searchParams, dispatch]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (isLoading) return <div className="text-center py-8">Loading results...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          sx={{
            borderRadius: '50px',
            padding: '8px 24px',
            textTransform: 'none',
            fontWeight: 'medium'
          }}
        >
          New Search
        </Button>
      </div>

      <CollegeResultsTable results={results} />

      {/* Modal for College Search Form */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="college-search-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            College Search
          </Typography>
          <CollegeSearchForm onSearchComplete={handleCloseModal} />
        </Box>
      </Modal>
    </div>
  );
}