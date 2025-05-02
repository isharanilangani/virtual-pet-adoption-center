import React from 'react';

const FilterBar = ({ moods, selectedMood, onSelectMood }) => (
  <div className="mb-3">
    <label className="form-label me-2">Filter by Mood:</label>
    <select
      value={selectedMood}
      onChange={(e) => onSelectMood(e.target.value)}
      className="form-select w-auto d-inline"
    >
      <option value="">All</option>
      {moods.map((mood) => <option key={mood}>{mood}</option>)}
    </select>
  </div>
);

export default FilterBar;
