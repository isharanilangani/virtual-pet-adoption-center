const Pet = require('../models/petModel');
const { calculateMood } = require('../utils/moodLogic');

//view all pets
const getAllPets = async () => {
  const pets = await Pet.find();
  return pets.map(pet => ({
    ...pet.toObject(),
    mood: calculateMood(pet.createdAt, pet.adopted),
  }));
};

//view pet by pet Id
const getPetById = async (id) => {
  const pet = await Pet.findById(id);
  return { ...pet.toObject(), mood: calculateMood(pet.createdAt, pet.adopted) };
};

//create new pet
const addPet = async (data) => await Pet.create(data);

//update pets
const updatePet = async (id, data) => await Pet.findByIdAndUpdate(id, data, { new: true });

//update adopt status
const adoptPet = async (id) => {
  return await Pet.findByIdAndUpdate(id, { adopted: true, adoption_date: new Date() }, { new: true });
};

//delete pet
const deletePet = async (id) => await Pet.findByIdAndDelete(id);

//filter by mood
const filterPetsByMood = async (mood) => {
  const pets = await Pet.find();

  return pets
    .map(pet => {
      const petMood = calculateMood(pet.createdAt, pet.adopted);
      return { ...pet.toObject(), mood: petMood };
    })
    .filter(pet => pet.mood.toLowerCase() === mood.toLowerCase());
};

//filter by personality
const filterPetsByPersonality = async (personality) => {
  const pets = await Pet.find();
  return pets
    .map(pet => ({ ...pet.toObject(), mood: calculateMood(pet.createdAt, pet.adopted) }))
    .filter(pet => pet.personality?.toLowerCase() === personality.toLowerCase());
};

module.exports = {
  getAllPets, getPetById, addPet, updatePet, adoptPet, deletePet, filterPetsByMood, filterPetsByPersonality
};
