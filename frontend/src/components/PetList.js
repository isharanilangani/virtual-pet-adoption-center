import React, { useState, useEffect, useCallback } from 'react';
import PetCard from './PetCard';
import { sortPetsByName } from '../utils/helpers';

const PetList = React.memo(({ pets, onAdopt, onDelete, onUpdate }) => {
  const [visiblePets, setVisiblePets] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [hasClickedSeeMore, setHasClickedSeeMore] = useState(false);

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

  // Function to load more pets
  const loadMorePets = useCallback(() => {
    if (isLoading || visiblePets >= sortedPets.length) return;

    setIsLoading(true);
    setTimeout(() => {
      setVisiblePets((prev) => {
        const increment = screenWidth <= 767 ? 1 : 3;
        const newVisible = Math.min(prev + increment, sortedPets.length);
        return newVisible;
      });
      setIsLoading(false);
    }, 500);
  }, [isLoading, visiblePets, screenWidth, sortedPets.length]);

  // Scroll & auto-load handler
  useEffect(() => {
    if (!hasClickedSeeMore) return;

    const checkScrollAndLoad = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Stop if all pets are loaded
      if (visiblePets >= sortedPets.length) return;

      // Load if near bottom or not enough content to scroll
      if (scrollTop + windowHeight >= fullHeight - 100 || windowHeight >= fullHeight) {
        loadMorePets();
      }
    };

    checkScrollAndLoad();

    window.addEventListener('scroll', checkScrollAndLoad);
    window.addEventListener('resize', checkScrollAndLoad);

    return () => {
      window.removeEventListener('scroll', checkScrollAndLoad);
      window.removeEventListener('resize', checkScrollAndLoad);
    };
  }, [hasClickedSeeMore, loadMorePets, visiblePets, sortedPets.length]);

  // Update screen width
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set initial visible pets based on screen size
  useEffect(() => {
    if (screenWidth <= 767) {
      setVisiblePets(1);
    } else if (screenWidth <= 1023) {
      setVisiblePets(2);
    } else {
      setVisiblePets(3);
    }
  }, [screenWidth]);

  // Handler for "See More" button
  const handleSeeMoreClick = () => {
    setHasClickedSeeMore(true);
    loadMorePets();
  };

  return (
    <div className="row">
      {sortedPets.slice(0, visiblePets).map((pet) => (
        <div key={pet._id} className="col-md-4 pet-card-col">
          <PetCard
            pet={pet}
            onAdopt={handleAdopt}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      ))}

      {isLoading && (
        <div className="text-center w-100 mt-3">
          <p>Loading more pets...</p>
        </div>
      )}

      {!hasClickedSeeMore && visiblePets < sortedPets.length && (
        <div className="text-center w-100 mt-3">
          <button className="btn btn-primary" onClick={handleSeeMoreClick}>
            See More
          </button>
        </div>
      )}
    </div>
  );
});

export default PetList;
