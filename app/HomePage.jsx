"use client";
import { useState } from "react";
import CollegeSearchForm from "./components/college/CollegeSearchForm";
import CollegeResultsTable from "./components/college/CollegeResultsTable";
import OtpModal from "./components/otp/OtpModal";
import Msg91Widget from "./components/otp/Msg91Widget";
import { Typography, Container, Alert } from "@mui/material";
import JEERankPredictorInfo from "./components/JEERankPredictorInfo";

export default function HomePage() {
  const [rank, setRank] = useState("");
  const [gender, setGender] = useState("Gender Neutral");
  const [category, setCategory] = useState("OPEN");
  const [stateId, setStateId] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const isVerified =
    typeof window !== "undefined"
      ? sessionStorage.getItem("isVerified") === "true"
      : false;

  const handleSearch = async () => {
    if (!rank || !gender || !category || !stateId) {
      setError("Please fill in all fields including State.");
      return;
    }
    setError(null);
    setIsLoading(true);

    if (!isVerified) {
      setShowModal(true);
    } else {
      await fetchResults();
    }

    setIsLoading(false);
  };

  const fetchResults = async () => {
    try {
      const params = new URLSearchParams({
        rank,
        gender,
        category,
        state_id: stateId,
      });

      const res = await fetch(`/api/colleges?${params}`);
      if (!res.ok) throw new Error("Failed to fetch results");

      const data = await res.json();
      setResults(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerificationSuccess = async () => {
    try {
      setShowModal(false);
      setIsLoading(true);
      await fetchResults();
      sessionStorage.setItem("isVerified", "true");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationFailure = (error) => {
    setError("OTP verification failed. Please try again.");
    console.error("Verification failed:", error);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        College Predictor
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <CollegeSearchForm
        rank={rank}
        setRank={setRank}
        gender={gender}
        setGender={setGender}
        category={category}
        setCategory={setCategory}
        stateId={stateId}
        setStateId={setStateId}
        onSubmit={handleSearch}
        isLoading={isLoading}
      />
      {results.length > 0 && isVerified ? (
        <CollegeResultsTable results={results} />
      ) : (
        <JEERankPredictorInfo />
      )}

      <OtpModal
        open={showModal}
        onClose={() => setShowModal(false)}
        phoneNumber={phoneNumber}
        onPhoneNumberChange={setPhoneNumber}
      />

      <Msg91Widget
        showModal={showModal}
        onVerificationSuccess={handleVerificationSuccess}
        onVerificationFailure={handleVerificationFailure}
        widgetId={process.env.NEXT_PUBLIC_MSG91_WIDGET_ID}
        authKey={process.env.NEXT_PUBLIC_MSG91_AUTH_KEY}
      />
    </Container>
  );
}
