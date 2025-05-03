const Pet = require('../models/petModel');
const { calculateMood } = require('../utils/moodLogic');

const getAllPets = async () => {
  const pets = await Pet.find();
  return pets.map(pet => ({
    ...pet.toObject(),
    mood: calculateMood(pet.createdAt),
  }));
};

const getPetById = async (id) => {
  const pet = await Pet.findById(id);
  return { ...pet.toObject(), mood: calculateMood(pet.createdAt) };
};

const addPet = async (data) => await Pet.create(data);

const updatePet = async (id, data) => await Pet.findByIdAndUpdate(id, data, { new: true });

const adoptPet = async (id) => {
  return await Pet.findByIdAndUpdate(id, { adopted: true, adoption_date: new Date() }, { new: true });
};

const deletePet = async (id) => await Pet.findByIdAndDelete(id);

const filterPetsByMood = async (mood) => {
  const pets = await Pet.find();

  return pets
    .map(pet => {
      const petMood = calculateMood(pet.createdAt);
      return { ...pet.toObject(), mood: petMood };
    })
    .filter(pet => pet.mood.toLowerCase() === mood.toLowerCase());
};


const filterPetsByPersonality = async (personality) => {
  const pets = await Pet.find();
  return pets
    .map(pet => ({ ...pet.toObject(), mood: calculateMood(pet.createdAt) }))
    .filter(pet => pet.personality?.toLowerCase() === personality.toLowerCase());
};

module.exports = {
  getAllPets, getPetById, addPet, updatePet, adoptPet, deletePet, filterPetsByMood
};
