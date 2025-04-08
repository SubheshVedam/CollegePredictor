"use client";
import { useState } from "react";
import InputForm from "./components/InputForm";
import CollegeTable from "./components/CollegeTable";
import OtpModal from "./components/OtpModal";

export default function Home() {
  const [rank, setRank] = useState("");
  const [gender, setGender] = useState("Gender Neutral");
  const [category, setCategory] = useState("OPEN");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    if (!rank || isNaN(rank)) {
      setError("Please enter a valid rank.");
      return;
    }
    setShowOtpModal(true);
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setIsOtpSent(true);
    } catch (err) {
      setError("Failed to send OTP: " + err.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setIsVerified(true);
      setShowOtpModal(false);
      fetchColleges();
    } catch (err) {
      setError("OTP Verification failed: " + err.message);
    }
  };

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/colleges?rank=${rank}&gender=${gender}&category=${category}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");

      const grouped = {};
      data.forEach((row) => {
        if (!grouped[row.institute_name]) grouped[row.institute_name] = [];
        grouped[row.institute_name].push(row);
      });

      const flattened = [];
      Object.entries(grouped).forEach(([institute_name, rows]) => {
        rows.forEach((row, idx) => {
          flattened.push({
            ...row,
            showInstituteName: idx === 0,
            rowspan: rows.length,
          });
        });
      });

      setResults(flattened);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-container">
      <h1 className="heading">College Predictor</h1>
      <InputForm
        rank={rank}
        setRank={setRank}
        gender={gender}
        setGender={setGender}
        category={category}
        setCategory={setCategory}
        onSubmit={handleSearch}
        loading={loading}
      />
      {error && <p className="error">{error}</p>}
      {results.length > 0 && <CollegeTable results={results} />}
      {!loading && results.length === 0 && isVerified && !error && (
        <p className="no-results">No results found for the given input.</p>
      )}
      {showOtpModal && (
        <OtpModal
          phone={phone}
          setPhone={setPhone}
          otp={otp}
          setOtp={setOtp}
          isOtpSent={isOtpSent}
          sendOtp={handleSendOtp}
          verifyOtp={handleVerifyOtp}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </main>
  );
}
