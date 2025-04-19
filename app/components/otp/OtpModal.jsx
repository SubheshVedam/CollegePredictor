"use client";
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Alert,
  InputAdornment,
} from "@mui/material";
import StyledInput from "../shared/StyledInput";

// Validation functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhoneNumber = (phone) => {
  return /^\d{10}$/.test(phone);
};

const validateName = (name) => {
  return name.trim().length >= 3;
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
  });
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [showUpdateNumber, setShowUpdateNumber] = useState(false);

  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
  };

  const errors = {
    fullName: !validateName(fullName),
    email: !validateEmail(email),
    phoneNumber: !validatePhoneNumber(phoneNumber),
  };

  const saveUserData = async () => {
    try {
      const response = await fetch('/api/save-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          name: fullName,
          email: email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  };

  const handleSendOTP = () => {
    // Mark all fields as touched to show errors
    setTouched({
      fullName: true,
      email: true,
      phoneNumber: true,
    });

    // Check for errors
    if (errors.fullName || errors.email || errors.phoneNumber) {
      setError("Please fix the errors before proceeding");
      return;
    }

    setError(null);
    setIsLoading(true);

    const formattedPhone = phoneNumber.startsWith("91")
      ? phoneNumber
      : `91${phoneNumber}`;

    window.sendOtp(
      formattedPhone,
      () => {
        setStep("enterOTP");
        setSuccess("OTP sent successfully!");
        setIsLoading(false);
        setVerificationFailed(false);
        setShowUpdateNumber(false);
        setTimeout(() => setSuccess(null), 3000);
      },
      (error) => {
        console.error("Error sending OTP:", error);
        setError("Failed to send OTP. Please try again.");
        setIsLoading(false);
      }
    );
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setError(null);
    setIsLoading(true);

    window.verifyOtp(
      otp,
      async (data) => {
        console.log("OTP verified successfully:", data);
        
        try {
          // Save user data to the database
          await saveUserData();
          
          setSuccess("Verification successful!");
          setIsLoading(false);
          setTimeout(() => {
            setSuccess(null);
            onClose();
          }, 1500);
        } catch (error) {
          console.error("Error saving user data:", error);
          setError("Verification successful but failed to save user data.");
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error verifying OTP:", error);
        setError("Invalid OTP. Please try again.");
        setVerificationFailed(true);
        setIsLoading(false);
      }
    );
  };

  const handleResendOTP = () => {
    setOtp("");
    setError(null);
    if (showUpdateNumber) {
      setShowUpdateNumber(false);
    }
    handleSendOTP();
  };

  const handleUpdateNumber = () => {
    setShowUpdateNumber(true);
    setStep("enterPhone");
    setError(null);
    setSuccess(null);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400 },
    bgcolor: "#fee5cd",
    boxShadow: 24,
    borderRadius: 2,
    p: 3,
    outline: 0,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      hideBackdrop={true}
      aria-labelledby="otp-modal-title"
      aria-describedby="otp-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="otp-modal-title" variant="h6" mb={2}>
          Sign in to view the list
        </Typography>

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
            {showUpdateNumber && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Update your mobile number to receive a new OTP
              </Alert>
            )}
            <StyledInput
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={handleBlur("fullName")}
              error={touched.fullName && errors.fullName}
              helperText={
                touched.fullName && errors.fullName
                  ? "Name must be at least 3 characters"
                  : ""
              }
              placeholder="Enter your full name"
            />
            <StyledInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur("email")}
              error={touched.email && errors.email}
              helperText={
                touched.email && errors.email
                  ? "Please enter a valid email"
                  : ""
              }
              placeholder="Enter your email"
            />
            <StyledInput
              label="Mobile No."
              type="tel"
              value={phoneNumber}
              onChange={(e) =>
                onPhoneNumberChange(e.target.value.replace(/\D/g, ""))
              }
              onBlur={handleBlur("phoneNumber")}
              error={touched.phoneNumber && errors.phoneNumber}
              helperText={
                touched.phoneNumber && errors.phoneNumber
                  ? "Please enter a valid 10-digit number"
                  : ""
              }
              placeholder="Enter your phone number"
              inputProps={{ maxLength: 10 }}
              startAdornment={
                <InputAdornment position="start">+91</InputAdornment>
              }
            />
            <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
              <Button
                variant="contained"
                onClick={handleSendOTP}
                disabled={isLoading}
                fullWidth
                sx={{
                  backgroundColor: "#FFA41A",
                  borderRadius: "12px",
                  height: "56px",
                }}
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
            <StyledInput
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 4-digit OTP"
              inputProps={{ maxLength: 4 }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <Box>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  sx={{ mr: 1, color: "#6C10BC" }}
                >
                  Resend OTP
                </Button>

                <Button
                  variant="text"
                  size="small"
                  onClick={handleUpdateNumber}
                  disabled={isLoading}
                  sx={{ ml: 1, color: "#6C10BC" }}
                >
                  Update Number
                </Button>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Valid for 5 minutes
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="contained"
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 4}
                fullWidth
                sx={{
                  backgroundColor: "#FFA41A",
                  borderRadius: "16px",
                  height: "56px",
                }}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </Box>
          </>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={2}
        >
          By clicking Sign Up, you agree to our{" "}
          <a href="/" target="_blank" rel="noopener noreferrer" style={{color:'text.secondary'}}>
            Terms & Conditions
          </a>
        </Typography>
      </Box>
    </Modal>
  );
}