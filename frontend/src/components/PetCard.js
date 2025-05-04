import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaDownload } from "react-icons/fa";
import { getMoodIcon } from "../utils/helpers";
import "../styles/global.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AdoptionCertificate from "./AdoptionCertificate";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const PetCard = React.memo(({ pet, onAdopt, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: pet.name,
    personality: pet.personality,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(pet._id, editData);
    setEditing(false);
  };

  const handleAdopt = () => {
    onAdopt(pet._id);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);
  };

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <div className={`card mb-3 shadow-sm fade-in`}>
        <div className="card-body">
          {editing ? (
            <>
              <input
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="form-control mb-2"
              />
              <input
                name="personality"
                value={editData.personality}
                onChange={handleEditChange}
                className="form-control mb-2"
              />
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={handleUpdate}
              >
                <FaCheck /> Save
              </button>
            </>
          ) : (
            <>
              <h5>{pet.name}</h5>
              <p>Species: {pet.species}</p>
              <p>Personality: {pet.personality}</p>
              <p>
                Mood: {getMoodIcon(pet.mood)} {pet.mood}
              </p>
              <p
                className={`fw-bold ${
                  pet.adopted ? "text-muted" : "text-success"
                }`}
              >
                Status: {pet.adopted ? "Adopted" : "Available"}
              </p>
              <div className="d-flex gap-2">
                {!pet.adopted && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={handleAdopt}
                  >
                    Adopt
                  </button>
                )}
                {pet.adopted && (
                  <PDFDownloadLink
                    document={
                      <AdoptionCertificate pet={pet} adopter="John Doe" />
                    }
                    fileName={`${pet.name}_adoption_certificate.pdf`}
                    className="btn btn-sm btn-outline-secondary mt-2 d-inline-flex align-items-center"
                  >
                    {({ loading }) =>
                      loading ? (
                        "Loading..."
                      ) : (
                        <>
                          <FaDownload className="me-1" />
                        </>
                      )
                    }
                  </PDFDownloadLink>
                )}
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setEditing(true)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(pet._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
});

export default PetCard;
