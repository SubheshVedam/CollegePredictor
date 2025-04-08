'use client';
import { useState } from 'react';

export default function Home() {
  const [filters, setFilters] = useState({
    institute_id: '',
    course_id: '',
    program_name: '',
    year: '',
    category: '',
    sub_category: '',
    gender: '',
    round: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">College Cutoff Data</h1>
      
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Institute ID</label>
            <input
              type="number"
              value={filters.institute_id}
              onChange={(e) => setFilters({...filters, institute_id: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Enter institute ID"
            />
          </div>
          
          <div>
            <label className="block mb-2">Course ID</label>
            <input
              type="number"
              value={filters.course_id}
              onChange={(e) => setFilters({...filters, course_id: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Enter course ID"
            />
          </div>
          
          <div>
            <label className="block mb-2">Program Name</label>
            <input
              type="text"
              value={filters.program_name}
              onChange={(e) => setFilters({...filters, program_name: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Search program name"
            />
          </div>
          
          <div>
            <label className="block mb-2">Year</label>
            <select
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">All Years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">All Categories</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2">Gender</label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters({...filters, gender: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2">Round</label>
            <select
              value={filters.round}
              onChange={(e) => setFilters({...filters, round: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">All Rounds</option>
              <option value="1">Round 1</option>
              <option value="2">Round 2</option>
              <option value="3">Round 3</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Searching...' : 'Search Cutoffs'}
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Results ({results.length})</h2>
        {results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Program</th>
                  <th className="py-2 px-4 border">Year</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Gender</th>
                  <th className="py-2 px-4 border">Round</th>
                  <th className="py-2 px-4 border">Opening Rank</th>
                  <th className="py-2 px-4 border">Closing Rank</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{item.program_name}</td>
                    <td className="py-2 px-4 border">{item.year}</td>
                    <td className="py-2 px-4 border">{item.category} {item.sub_category && `(${item.sub_category})`}</td>
                    <td className="py-2 px-4 border">{item.gender}</td>
                    <td className="py-2 px-4 border">{item.round}</td>
                    <td className="py-2 px-4 border">{item.opening_rank}</td>
                    <td className="py-2 px-4 border">{item.closing_rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No results found. Try adjusting your filters.</p>
        )}
      </div>
    </div>
  );
}