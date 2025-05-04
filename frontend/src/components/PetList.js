import React, { useState, useEffect, useCallback } from 'react';
import PetCard from './PetCard';
import { sortPetsByName } from '../utils/helpers';

const PetList = React.memo(({ pets, onAdopt, onDelete, onUpdate }) => {
  const [visiblePets, setVisiblePets] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
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

  // Load more pets when user scrolls near the bottom
  const loadMorePets = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisiblePets((prev) => prev + 3);
      setIsLoading(false);
    }, 500);
  }, [isLoading]);
  
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom) {
      loadMorePets();
    }
  }, [loadMorePets]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="row">
      {sortedPets.slice(0, visiblePets).map((pet) => (
        <div key={pet._id} className="col-md-4">
          <PetCard pet={pet} onAdopt={handleAdopt} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
      ))}
      
      {isLoading && (
        <div className="text-center w-100 mt-3">
          <p>Loading more pets...</p>
        </div>
      )}
      
      {visiblePets < sortedPets.length && !isLoading && (
        <div className="text-center w-100 mt-3">
          <button className="btn btn-primary" onClick={loadMorePets}>
            See More
          </button>
        </div>
      )}
    </div>
  );
});

export default PetList;
