"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchCollegeResults, 
  setIsVerified,
  setShowOtpModal,
  setPhoneNumber,
  setError
} from '../redux/searchSlice';
import CollegeResultsTable from '../components/college/CollegeResultsTable';
import CollegeSearchForm from '../components/college/CollegeSearchForm';
import OtpModal from '../components/otp/OtpModal';
import { 
  Button, 
  Modal, 
  Box, 
  Typography, 
  Backdrop,
  CircularProgress,
  Alert,
  Paper,
  Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', md: '70%' },
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
  const { 
    results, 
    isLoading, 
    error,
    isVerified,
    showOtpModal,
    phoneNumber
  } = useSelector((state) => state.collegePredictor);
  
  const [openSearchModal, setOpenSearchModal] = useState(false);

  // Initialize Msg91 OTP widget
  useEffect(() => {
    if (showOtpModal && typeof window !== "undefined") {
      const configuration = {
        widgetId: process.env.NEXT_PUBLIC_MSG91_WIDGET_ID,
        tokenAuth: process.env.NEXT_PUBLIC_MSG91_AUTH_KEY,
        exposeMethods: true,
        success: (data) => {
          console.log('Verification success:', data);
          sessionStorage.setItem("isVerified", "true");
          handleOtpVerificationSuccess();
        },
        failure: (error) => {
          console.error('Verification failed:', error);
          dispatch(setError("OTP verification failed. Please try again."));
        }
      };

      const script = document.createElement('script');
      script.src = 'https://control.msg91.com/app/assets/otp-provider/otp-provider.js';
      script.onload = () => {
        if (window.initSendOTP) {
          window.initSendOTP(configuration);
        }
      };
      document.body.appendChild(script);

      return () => {
        // Clean up the script when component unmounts or showOtpModal changes
        document.body.removeChild(script);
      };
    }
  }, [showOtpModal, dispatch]);

  useEffect(() => {
    const rank = searchParams.get('rank');
    const gender = searchParams.get('gender');
    const category = searchParams.get('category');
    const stateId = searchParams.get('stateId');

    if (rank && gender && category && stateId) {
      // Check sessionStorage for verification status
      const verified = sessionStorage.getItem('isVerified') === 'true';
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

  const handleOtpVerificationSuccess = () => {
    // Store verification in sessionStorage (persists only for current session)
    sessionStorage.setItem('isVerified', 'true');
    dispatch(setIsVerified(true));
    dispatch(setShowOtpModal(false));
    
    // Fetch results after successful verification
    const rank = searchParams.get('rank');
    const gender = searchParams.get('gender');
    const category = searchParams.get('category');
    const stateId = searchParams.get('stateId');
    dispatch(fetchCollegeResults({ rank, gender, category, stateId }));
  };

  const handlePhoneNumberChange = (number) => {
    dispatch(setPhoneNumber(number));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      position: 'relative',
      filter: showOtpModal ? 'blur(4px)' : 'none',
      transition: 'filter 0.3s ease'
    }}>
      <Backdrop
        open={showOtpModal}
        sx={{ 
          zIndex: (theme) => theme.zIndex.modal - 1,
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
      />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Search Results
          </Typography>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleOpenSearchModal}
            sx={{
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 'medium'
            }}
          >
            New Search
          </Button>
        </Box>

        {isVerified ? (
          <CollegeResultsTable results={results} />
        ) : (
          <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Please complete OTP verification to view results
            </Typography>
          </Paper>
        )}

        {/* Search Form Modal */}
        <Modal
          open={openSearchModal}
          onClose={handleCloseSearchModal}
          aria-labelledby="college-search-modal"
        >
          <Box sx={modalStyle}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              College Search
            </Typography>
            <CollegeSearchForm onSearchComplete={handleCloseSearchModal} />
          </Box>
        </Modal>

        {/* OTP Verification Modal */}
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