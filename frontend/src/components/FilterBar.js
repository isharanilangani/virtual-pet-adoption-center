import React from "react";

const FilterBar = ({ moods, selectedMood, onSelectMood }) => {
  return (
    <div className="filter-bar mb-3">
      <select
        value={selectedMood}
        onChange={(e) => onSelectMood(e.target.value)}
        className="form-select w-auto"
      >
        <option value="">Filter by Mood</option>
        {moods.map((mood) => (
          <option key={mood} value={mood}>
            {mood}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
