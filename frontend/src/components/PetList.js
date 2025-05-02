import React, { useCallback } from 'react';
import PetCard from './PetCard';
import { sortPetsByName } from '../utils/helpers';

const PetList = React.memo(({ pets, onAdopt, onDelete, onUpdate }) => {
  const handleAdopt = useCallback((id) => {
    onAdopt(id);
  }, [onAdopt]);

  const handleDelete = useCallback((id) => {
    onDelete(id);
  }, [onDelete]);

  const handleUpdate = useCallback((id, data) => {
    onUpdate(id, data);
  }, [onUpdate]);

  const sortedPets = sortPetsByName(pets);

  return (
    <div className="row">
      {sortedPets.map(pet => (
        <div key={pet._id} className="col-md-4">
          <PetCard pet={pet} onAdopt={handleAdopt} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
      ))}
    </div>
  );
});

export default PetList;
