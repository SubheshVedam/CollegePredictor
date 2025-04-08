"use client";

import { useState } from "react";
import OtpModal from "./components/OtpModal"; // Make sure path is correct
import CollegeTable from "./components/CollegeTable";

export default function Page() {
  const [rank, setRank] = useState("");
  const [gender, setGender] = useState("Gender Neutral");
  const [category, setCategory] = useState("OPEN");
  const [results, setResults] = useState([]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSearch = async () => {
    if (!rank) return;

    const phone = sessionStorage.getItem("verifiedPhone");
    const isVerified = sessionStorage.getItem("isVerified");

    if (phone && isVerified === "true") {
      fetchResults();
    } else {
      setShowOtpModal(true);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await fetch(
        `/api/colleges?rank=${rank}&gender=${gender}&category=${category}`
      );
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    }
  };

  const handleVerificationSuccess = () => {
    sessionStorage.setItem("isVerified", "true");
    fetchResults();
    setShowOtpModal(false)
  };

  return (
    <div className="main-container">
      <h1>College Predictor</h1>
      <input
        type="number"
        placeholder="Enter your rank"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="Gender Neutral">Gender Neutral</option>
        <option value="Female Only">Female Only</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="OPEN">OPEN</option>
        <option value="EWS">EWS</option>
        <option value="OBC">OBC</option>
        <option value="SC">SC</option>
        <option value="ST">ST</option>
      </select>
      <button onClick={handleSearch}>Find Colleges</button>

      {showOtpModal && (
        <OtpModal
          onVerified={handleVerificationSuccess}
          onClose={() => setShowOtpModal(false)}
        />
      )}

      {results.length > 0 && <CollegeTable results={results} />}
    </div>
  );
}
