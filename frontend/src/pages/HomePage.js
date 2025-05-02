import React, { useState, useEffect } from 'react';
import AddPetForm from '../components/AddPetForm';
import FilterBar from '../components/FilterBar';
import PetList from '../components/PetList';
import { getAllPets, adoptPet, deletePet, updatePet, filterPetsByMood } from '../services/api';

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');
  const moods = ['Happy', 'Excited', 'Sad'];

  const fetchPets = async () => {
    const res = selectedMood ? await filterPetsByMood(selectedMood) : await getAllPets();
    setPets(res.data);
  };

  useEffect(() => {
    fetchPets();
  }, [selectedMood]);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Pet Adoption Center</h2>
      <AddPetForm onAdd={fetchPets} />
      <FilterBar moods={moods} selectedMood={selectedMood} onSelectMood={setSelectedMood} />
      <PetList pets={pets} onAdopt={async (id) => { await adoptPet(id); fetchPets(); }} onDelete={async (id) => { await deletePet(id); fetchPets(); }} onUpdate={async (id, data) => { await updatePet(id, data); fetchPets(); }} />
    </div>
  );
};

export default HomePage;
