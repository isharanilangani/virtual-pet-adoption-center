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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

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

  useEffect(() => {
    checkForSadPets(pets);
  }, [pets]);

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

  const Modal = ({ show, onHide, children, title }) => (
    <div
      className={`modal fade show ${show ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

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
                  setSelectedMood("");
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
            className="img-fluid large-dog-gif"
            title="Take Personality Quiz"
          />
        </div>

        <Modal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          title="Add a New Pet"
        >
          <AddPetForm
            onAdd={() => {
              fetchPets();
              setShowAddModal(false);
            }}
          />
        </Modal>

        <Modal
          show={showQuizModal}
          onHide={() => setShowQuizModal(false)}
          title="Personality Quiz"
        >
          <PersonalityQuiz
            onMatch={(personality) => {
              handleMatch(personality);
              setShowQuizModal(false);
            }}
          />
        </Modal>

        <ToastContainer />
      </div>
    </div>
  );
};

export default HomePage;
