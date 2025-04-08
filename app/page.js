"use client";
import { useState, useEffect } from "react";
import CollegeTable from "./components/CollegeTable";
import OtpModal from "./components/OtpModal";
import { stateOptions } from "@/lib/states"; // make sure this file exports the array

export default function HomePage() {
  const [rank, setRank] = useState("");
  const [gender, setGender] = useState("Gender Neutral");
  const [category, setCategory] = useState("OPEN");
  const [stateId, setStateId] = useState(""); // added
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const isVerified = typeof window !== "undefined" && sessionStorage.getItem("isVerified") === "true";

  const handleSearch = () => {
    if (!rank || !gender || !category || !stateId) {
      alert("Please fill in all fields including State.");
      return;
    }

    if (!isVerified) {
      setShowModal(true);
    } else {
      fetchResults();
    }
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
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("❌ Failed to fetch colleges:", error);
    }
  };

  const handleVerificationSuccess = () => {
    sessionStorage.setItem("isVerified", "true");
    setShowModal(false);
    fetchResults();
  };

  return (
    <div className="homepage">
      <h1>College Predictor</h1>

      <div className="form-section">
        <input
          type="number"
          placeholder="Enter your rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
        />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Gender Neutral">Gender Neutral</option>
          <option value="Female">Female-only</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="OPEN">OPEN</option>
          <option value="OBC-NCL">OBC-NCL</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="EWS">EWS</option>
        </select>

        <select value={stateId} onChange={(e) => setStateId(e.target.value)}>
          <option value="">Select State</option>
          {stateOptions.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>

        <button onClick={handleSearch}>Find Colleges</button>
      </div>

      {results.length > 0 && isVerified && <CollegeTable results={results} />}

      {showModal && (
        <OtpModal
          onClose={() => setShowModal(false)}
          onVerified={handleVerificationSuccess}
          stateId={stateId}
        />
      )}
    </div>
  );
}
