"use client";
import { useState } from "react";
import CollegeResultsTable from "./components/college/CollegeResultsTable";
import OtpModal from "./components/otp/OtpModal";
import Msg91Widget from "./components/otp/Msg91Widget";
import JEERankPredictorInfo from "./components/JEERankPredictorInfo";
import CollegePredictorSearch from "./components/college/CollegePredictorSearch";

const CollegePredictor = ({
  widgetId,
  authKey,
  defaultRank = "",
  defaultGender = "Gender Neutral",
  defaultCategory = "OPEN",
  defaultStateId = "",
}) => {
  const [rank, setRank] = useState(defaultRank);
  const [gender, setGender] = useState(defaultGender);
  const [category, setCategory] = useState(defaultCategory);
  const [stateId, setStateId] = useState(defaultStateId);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const isVerified =
    typeof window !== "undefined"
      ? sessionStorage.getItem("isVerified") === "true"
      : false;

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
    <>
      {results.length > 0 && isVerified ? (
        <CollegeResultsTable results={results} onSearch={handleSearch}  rank={rank}
        setRank={setRank}
        gender={gender}
        setGender={setGender}
        category={category}
        setCategory={setCategory}
        stateId={stateId}
        setStateId={setStateId} />
      ) : (
        <>
          <CollegePredictorSearch
            error={error}
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
          <JEERankPredictorInfo />
        </>
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
        widgetId={widgetId}
        authKey={authKey}
      />
    </>
  );
};

export default CollegePredictor;
