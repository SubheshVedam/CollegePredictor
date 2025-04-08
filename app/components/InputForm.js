export default function InputForm({
    rank,
    setRank,
    gender,
    setGender,
    category,
    setCategory,
    onSubmit,
    loading,
  }) {
    const categoryOptions = [
      "OPEN", "OPEN (PwD)", "EWS", "OBC-NCL", "SC", "ST",
      "OBC-NCL (PwD)", "SC (PwD)", "EWS (PwD)", "ST (PwD)",
    ];
    const genderOptions = ["Gender Neutral", "Female"];
  
    return (
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter Rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="input"
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="select">
          {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="select">
          {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={onSubmit} className="button">
          {loading ? "Loading..." : "Find Colleges"}
        </button>
      </div>
    );
  }
  