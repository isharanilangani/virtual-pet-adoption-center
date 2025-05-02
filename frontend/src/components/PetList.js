import React from 'react';
import PetCard from './PetCard';

const PetList = ({ pets, onAdopt, onDelete, onUpdate }) => (
  <div className="row">
    {pets.map(pet => (
      <div key={pet._id} className="col-md-4">
        <PetCard pet={pet} onAdopt={onAdopt} onDelete={onDelete} onUpdate={onUpdate} />
      </div>
    ))}
  </div>
);

export default PetList;
