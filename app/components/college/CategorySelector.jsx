"use client";

export default function CategorySelector({ value, onChange }) {

const categories = [
  "OPEN", "OPEN (PwD)", "EWS", "OBC-NCL", "SC", "ST",
  "OBC-NCL (PwD)", "SC (PwD)", "EWS (PwD)", "ST (PwD)",
];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
      </select>
    </div>
  );
}

