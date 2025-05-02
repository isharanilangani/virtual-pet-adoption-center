import React, { useState } from 'react';
import { FaSmile, FaMeh, FaFrown, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import './PetCard.css';

const moodIcons = {
  Happy: <FaSmile className="text-success" />,
  Excited: <FaMeh className="text-warning" />,
  Sad: <FaFrown className="text-danger" />,
};

const PetCard = ({ pet, onAdopt, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: pet.name, personality: pet.personality });

  const handleEditChange = (e) => {
    setEditData({...editData, [e.target.name]: e.target.value});
  };

  const handleUpdate = () => {
    onUpdate(pet._id, editData);
    setEditing(false);
  };

  return (
    <div className={`card mb-3 shadow-sm fade-in`}>
      <div className="card-body">
        {editing ? (
          <>
            <input name="name" value={editData.name} onChange={handleEditChange} className="form-control mb-2" />
            <input name="personality" value={editData.personality} onChange={handleEditChange} className="form-control mb-2" />
            <button className="btn btn-sm btn-primary me-2" onClick={handleUpdate}><FaCheck /> Save</button>
          </>
        ) : (
          <>
            <h5>{pet.name}</h5>
            <p>Species: {pet.species}</p>
            <p>Personality: {pet.personality}</p>
            <p>Mood: {moodIcons[pet.mood]} {pet.mood}</p>
            <p className={`fw-bold ${pet.adopted ? 'text-muted' : 'text-success'}`}>Status: {pet.adopted ? 'Adopted' : 'Available'}</p>
            <div className="d-flex gap-2">
              {!pet.adopted && (
                <button className="btn btn-sm btn-success" onClick={() => onAdopt(pet._id)}>Adopt</button>
              )}
              <button className="btn btn-sm btn-outline-primary" onClick={() => setEditing(true)}><FaEdit /></button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(pet._id)}><FaTrash /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PetCard;
