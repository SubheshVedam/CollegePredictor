"use client";

export default function GenderSelector({ value, onChange }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Gender
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="Gender Neutral">Gender Neutral</option>
        <option value="Female">Female Only</option>
      </select>
    </div>
  );
}