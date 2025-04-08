"use client";

import { useState } from "react";

export default function CollegeTable({ results }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [details, setDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleViewDetails = async (row) => {
    setSelectedRow(row);
    setShowModal(true);
    setLoading(true);
    setError("");
    setDetails(null);

    try {
      const params = new URLSearchParams({
        institute_id: row.institute_id,
        program_name: row.program_name,
        gender: row.gender,
        category: row.category,
        sub_category: row.sub_category,
      });

      const res = await fetch(`/api/program-details?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch details");

      setDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Group rows by institute_name
  const groupedRows = results.reduce((acc, row) => {
    const key = row.institute_id;
    if (!acc[key]) {
      acc[key] = { name: row.institute_name, rows: [] };
    }
    acc[key].rows.push(row);
    return acc;
  }, {});

  return (
    <>
      <div className="college-table-container">
        <table className="college-table">
          <thead>
            <tr>
              <th>Institute</th>
              <th>Program</th>
              <th>Closing Rank</th>
              <th>Quota</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedRows).map(([key, group]) =>
              group.rows.map((row, idx) => (
                <tr key={`${key}-${idx}`}>
                  {idx === 0 && (
                    <td rowSpan={group.rows.length} style={{ verticalAlign: "top" }}>
                      {group.name}
                    </td>
                  )}
                  <td>{row.program_name}</td>
                  <td>{row.closing_rank}</td>
                  <td>{row.sub_category}</td>
                  <td>
                    <button
                      className="college-table-button"
                      onClick={() => handleViewDetails(row)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="college-table-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="college-table-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="college-table-modal-title row">Program Details</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="college-table-error">{error}</p>}

            {details && Array.isArray(details) && (
              <>
                <p className="row">
                  <strong>Institute:</strong> {selectedRow.institute_name}
                </p>
                <p className="row">
                  <strong>Program:</strong> {selectedRow.program_name}
                </p>

                <div className="college-table-inner-table-wrapper">
                  <table className="college-table-inner-table">
                    <thead>
                      <tr className="row">
                        <th>Round</th>
                        <th>Opening Rank</th>
                        <th>Closing Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((d, i) => (
                        <tr className="row" key={i}>
                          <td>{d.round}</td>
                          <td>{d.opening_rank}</td>
                          <td>{d.closing_rank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <button
              className="college-table-close-button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
