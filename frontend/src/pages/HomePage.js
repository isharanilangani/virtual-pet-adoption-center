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
  filterPetsByMood,
} from "../services/api";
import { sortPetsByName, checkForSadPets } from "../utils/helpers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import dogGif from "../assets/animated-dog.gif";

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [matchedPersonality, setMatchedPersonality] = useState(null);
  const moods = ["Happy", "Excited", "Sad"];
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

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

  useEffect(() => {
    checkForSadPets(pets); // Check for sad pets when pets data changes
  }, [pets]);

  return (
    <div className="home-page">
      <div className="container my-4 text-white">
        <h2 className="fw-bold mb-4">Pet Adoption Center</h2>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div className="me-2">
            <FilterBar
              moods={moods}
              selectedMood={selectedMood}
              onSelectMood={setSelectedMood}
            />
          </div>
          <div className="d-flex gap-2">
            {matchedPersonality && (
              <button
                className="btn btn-warning mt-2 mt-md-0"
                onClick={() => {
                  setMatchedPersonality(null);
                  setSelectedMood(""); // Reset mood if needed
                  fetchPets();
                }}
              >
                Clear Personality Filter
              </button>
            )}
            <button
              className="btn btn-primary mt-2 mt-md-0"
              onClick={() => setShowAddModal(true)}
            >
              Add New Pet
            </button>
          </div>
        </div>

        {showAddModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add a New Pet</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <AddPetForm
                    onAdd={() => {
                      fetchPets();
                      setShowAddModal(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {pets.length === 0 ? (
          <p className="mt-3">No pets available for the selected mood.</p>
        ) : (
          <PetList
            pets={pets}
            onAdopt={handleAdopt}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}

        <div className="pet-icon" onClick={() => setShowQuizModal(true)}>
          <img
            src={dogGif}
            alt="Take Personality Quiz"
            className="img-fluid"
            title="Take Personality Quiz"
          />
        </div>
        {showQuizModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Personality Quiz</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowQuizModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <PersonalityQuiz
                    onMatch={(personality) => {
                      handleMatch(personality);
                      setShowQuizModal(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default HomePage;
