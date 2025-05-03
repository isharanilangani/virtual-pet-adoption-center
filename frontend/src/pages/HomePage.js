import React, { useState, useEffect, useCallback } from "react";
import AddPetForm from "../components/AddPetForm";
import FilterBar from "../components/FilterBar";
import PetList from "../components/PetList";
import PersonalityQuiz from "../components/PersonalityQuiz";
import {
  getAllPets,
  adoptPet,
  deletePet,
  updatePet,
  filterPetsByPersonality,
} from "../services/api";
import { filterPetsByMood, sortPetsByName } from "../utils/helpers";

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [matchedPersonality, setMatchedPersonality] = useState(null);
  const moods = ["Happy", "Excited", "Sad"];

  const fetchPets = useCallback(async () => {
    try {
      const res = selectedMood
        ? await filterPetsByMood(selectedMood)
        : await getAllPets();
      if (Array.isArray(res.data)) {
        const sortedPets = sortPetsByName(res.data);
        setPets(sortedPets);
      } else {
        console.error("Fetched data is not an array", res);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  }, [selectedMood]);

  useEffect(() => {
    fetchPets();
  }, [selectedMood, fetchPets]);

  const handleAdopt = useCallback(
    async (id) => {
      await adoptPet(id);
      fetchPets();
    },
    [fetchPets]
  );

  const handleDelete = useCallback(
    async (id) => {
      await deletePet(id);
      fetchPets();
    },
    [fetchPets]
  );

  const handleUpdate = useCallback(
    async (id, data) => {
      await updatePet(id, data);
      fetchPets();
    },
    [fetchPets]
  );

  const handleMatch = async (personality) => {
    setMatchedPersonality(personality);
    console.log("Matched personality:", personality);
    try {
      const res = await filterPetsByPersonality(personality);
      if (Array.isArray(res.data)) {
        const sortedPets = sortPetsByName(res.data);
        setPets(sortedPets);
      } else {
        console.error("Fetched data is not an array:", res);
      }
    } catch (error) {
      console.error("Error filtering pets by personality:", error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Pet Adoption Center</h2>
      <PersonalityQuiz onMatch={handleMatch} />

      {matchedPersonality && (
        <button
          className="btn btn-outline-secondary mt-2"
          onClick={() => {
            setMatchedPersonality(null);
            fetchPets(); // refetch all pets
          }}
        >
          Clear Match
        </button>
      )}
      <AddPetForm onAdd={fetchPets} />
      <FilterBar
        moods={moods}
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
      />
      <PetList
        pets={pets}
        onAdopt={handleAdopt}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default HomePage;
