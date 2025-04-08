'use client';
import { useState } from 'react';

export default function Home() {
  const [rank, setRank] = useState('');
  const [gender, setGender] = useState('Gender Neutral');
  const [category, setCategory] = useState('OPEN');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const RESULTS_PER_PAGE = 30;
  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const fetchColleges = async () => {
    if (!rank || isNaN(rank)) {
      setError('Please enter a valid rank.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/colleges?rank=${rank}&gender=${gender}&category=${category}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setResults(data);
      setCurrentPage(1); // Reset to page 1 on new fetch
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    'OPEN', 'OPEN (PwD)', 'EWS', 'OBC-NCL', 'SC', 'ST',
    'OBC-NCL (PwD)', 'SC (PwD)', 'EWS (PwD)', 'ST (PwD)'
  ];

  const genderOptions = ['Gender Neutral', 'Female'];

  return (
    <main className="home-container">
      <div className="home-box">
        <h1 className="home-title">College Predictor</h1>

        <div className="input-grid">
          <input
            className="input"
            type="number"
            placeholder="Enter your rank"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />
          <select className="input" value={gender} onChange={(e) => setGender(e.target.value)}>
            {genderOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button className="button" onClick={fetchColleges}>
          {loading ? 'Loading...' : 'Find Colleges'}
        </button>

        {error && <p className="error-text">{error}</p>}

        {results.length > 0 && (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Institute</th>
                    <th>Program</th>
                    <th>Closing Rank</th>
                    <th>Category</th>
                    <th>Gender</th>
                    <th>Sub Category</th>
                    <th>Round</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedResults.map((row, idx) => (
                    <tr className="row" key={idx}>
                      <td>{row.institute_name}</td>
                      <td>{row.program_name}</td>
                      <td>{row.closing_rank}</td>
                      <td>{row.category}</td>
                      <td>{row.gender}</td>
                      <td>{row.sub_category}</td>
                      <td>{row.round}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="pagination-button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}

        {!loading && results.length === 0 && !error && (
          <p className="neutral-text">No results yet. Please enter inputs and search.</p>
        )}
      </div>
    </main>
  );
}
