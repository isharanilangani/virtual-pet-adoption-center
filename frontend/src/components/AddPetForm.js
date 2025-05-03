import React, { useState } from "react";
import { addPet } from "../services/api";
import "../styles/global.css";

const AddPetForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    personality: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPet(formData);
    setFormData({ name: "", species: "", age: "", personality: "" });
    onAdd();
  };

  const personalityOptions = [
    "Calm",
    "Playful",
    "Shy",
    "Energetic",
    "Friendly",
  ];

  return (
    <form onSubmit={handleSubmit} className="row g-3 add-pet-form">
      <div className="col-md-6">
        <label className="form-label primary-label">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control primary-input"
          placeholder="e.g., Bella"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label primary-label">Species</label>
        <input
          type="text"
          name="species"
          value={formData.species}
          onChange={handleChange}
          className="form-control primary-input"
          placeholder="e.g., Dog"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label primary-label">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="form-control primary-input"
          placeholder="e.g., 3"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label primary-label">Personality</label>
        <select
          name="personality"
          value={formData.personality}
          onChange={handleChange}
          className="form-select primary-select"
          required
        >
          <option value="" disabled>
            Select Personality
          </option>
          {personalityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 text-end">
        <button type="submit" className="btn primary-btn">
          Add Pet
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;
