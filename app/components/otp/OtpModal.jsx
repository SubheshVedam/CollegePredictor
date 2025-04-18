"use client";
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Alert,
  InputAdornment
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  outline: 0
};

export default function OtpModal({
  open,
  onClose,
  phoneNumber,
  onPhoneNumberChange,
}) {
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enterPhone");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSendOTP = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setError(null);
    setIsLoading(true);

    const formattedPhone = phoneNumber.startsWith('91') ? phoneNumber : `91${phoneNumber}`;
    
    window.sendOtp(
      formattedPhone,
      () => {
        setStep("enterOTP");
        setSuccess("OTP sent successfully!");
        setIsLoading(false);
        setTimeout(() => setSuccess(null), 3000);
      },
      (error) => {
        console.error('Error sending OTP:', error);
        setError("Failed to send OTP. Please try again.");
        setIsLoading(false);
      }
    );
  };

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setError(null);
    setIsLoading(true);

    window.verifyOtp(
      otp,
      (data) => {
        console.log('OTP verified successfully:', data);
        setSuccess("Verification successful!");
        setIsLoading(false);
        setTimeout(() => {
          setSuccess(null);
          onClose();
        }, 1500);
      },
      (error) => {
        console.error('Error verifying OTP:', error);
        setError("Invalid OTP. Please try again.");
        setIsLoading(false);
      }
    );
  };

  const handleResendOTP = () => {
    setOtp("");
    setError(null);
    handleSendOTP();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="otp-modal-title"
      aria-describedby="otp-modal-description"
    >
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="otp-modal-title" variant="h6" component="h2">
            OTP Verification
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {step === "enterPhone" ? (
          <>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => onPhoneNumberChange(e.target.value)}
              placeholder="Enter your phone number"
              margin="normal"
              type="tel"
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
              }}
            />
            <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSendOTP}
                disabled={isLoading || !phoneNumber || phoneNumber.length < 10}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="body1" mb={2}>
              OTP sent to +91{phoneNumber}
            </Typography>
            <TextField
              fullWidth
              label="Enter OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 4-digit OTP"
              margin="normal"
              inputProps={{ maxLength: 4 }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Button
                variant="text"
                size="small"
                onClick={handleResendOTP}
                disabled={isLoading}
              >
                Resend OTP
              </Button>
              <Typography variant="caption" color="text.secondary">
                Valid for 5 minutes
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 4}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}