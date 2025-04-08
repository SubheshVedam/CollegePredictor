"use client";
import { useState } from "react";

export default function Home() {
  const [rank, setRank] = useState("");
  const [gender, setGender] = useState("Gender Neutral");
  const [category, setCategory] = useState("OPEN");
  const [results, setResults] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const categoryOptions = [
    "OPEN",
    "OPEN (PwD)",
    "EWS",
    "OBC-NCL",
    "SC",
    "ST",
    "OBC-NCL (PwD)",
    "SC (PwD)",
    "EWS (PwD)",
    "ST (PwD)",
  ];
  const genderOptions = ["Gender Neutral", "Female"];

  const fetchColleges = async () => {
    if (!rank || isNaN(rank)) {
      setError("Please enter a valid rank.");
      return;
    }

    setError("");
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
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async (instituteId, programName, gender, category) => {
    try {
      const res = await fetch(
        `/api/program-details?institute_id=${instituteId}&program_name=${encodeURIComponent(
          programName
        )}&gender=${encodeURIComponent(gender)}&category=${encodeURIComponent(category)}`
      );
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.error || "Failed to fetch round details");
  
      // Directly store the round-wise rank data
      setDetails(data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load details.");
    }
  };
  

  const closeModal = () => {
    setShowModal(false);
    setDetails(null);
  };

  return (
    <main className="main-container">
      <h1 className="heading">College Predictor</h1>

      <div className="input-container">
        <input
          type="number"
          placeholder="Enter rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="input"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="select"
        >
          {genderOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select"
        >
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button onClick={fetchColleges} className="button">
          {loading ? "Loading..." : "Find Colleges"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {results.length > 0 && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Institute</th>
                <th>Program</th>
                <th>Closing Rank</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <tr key={idx}>
                  {row.showInstituteName && (
                    <td rowSpan={row.rowspan}>{row.institute_name}</td>
                  )}
                  <td>{row.program_name}</td>
                  <td>{row.closing_rank}</td>
                  <td>
                    <button
                      onClick={() =>
                        fetchDetails(
                          row.institute_id,
                          row.program_name,
                          gender,
                          category
                        )
                      }
                      className="details-button"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && results.length === 0 && !error && (
        <p className="no-results">
          No results yet. Please enter inputs and search.
        </p>
      )}

{showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="modal-title row">Round-wise Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Round</th>
            <th>Opening Rank</th>
            <th>Closing Rank</th>
          </tr>
        </thead>
        <tbody>
          {details.map((d, i) => (
            <tr key={i} className="row">
              <td>{d.round}</td>
              <td>{d.opening_rank}</td>
              <td>{d.closing_rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button" onClick={closeModal}>
        Close
      </button>
    </div>
  </div>
)}

    </main>
  );
}
