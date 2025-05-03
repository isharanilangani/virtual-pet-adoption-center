import React, { useState } from 'react';
import { addPet } from '../services/api';

const AddPetForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '', species: '', age: '', personality: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPet(formData);
    setFormData({ name: '', species: '', age: '', personality: '' });
    onAdd();
  };

  const personalityOptions = ['Calm', 'Playful', 'Shy', 'Energetic', 'Friendly'];

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-4">
      {['name', 'species', 'age'].map((field) => (
        <div key={field} className="col-md-3">
          <input
            type={field === 'age' ? 'number' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="form-control"
            required
          />
        </div>
      ))}

      {/* Personality dropdown */}
      <div className="col-md-3">
        <select
          name="personality"
          value={formData.personality}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="" disabled>Select Personality</option>
          {personalityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <button type="submit" className="btn btn-success w-100">Add Pet</button>
      </div>
    </form>
  );
};

export default AddPetForm;
