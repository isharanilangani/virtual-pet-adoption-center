const service = require('../services/petService');

exports.getAllPets = async (req, res) => {
  res.json(await service.getAllPets());
};

exports.getPet = async (req, res) => {
  const pet = await service.getPetById(req.params.id);
  res.json(pet);
};

exports.createPet = async (req, res) => {
  const pet = await service.addPet(req.body);
  res.status(201).json(pet);
};

exports.updatePet = async (req, res) => {
  const updated = await service.updatePet(req.params.id, req.body);
  res.json(updated);
};

exports.adoptPet = async (req, res) => {
  const adopted = await service.adoptPet(req.params.id);
  res.json({ message: "Pet adopted!", pet: adopted });
};

exports.deletePet = async (req, res) => {
  await service.deletePet(req.params.id);
  res.json({ message: "Pet deleted." });
};

exports.filterByMood = async (req, res) => {
  const { mood } = req.query;
  const filtered = await service.filterPetsByMood(mood);
  res.json(filtered);
};
