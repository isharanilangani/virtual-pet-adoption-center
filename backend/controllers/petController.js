const service = require('../services/petService');

exports.getAllPets = async (req, res) => {
  try {
    const pets = await service.getAllPets();
    res.json(pets);
  } catch (error) {
    console.error('Error in getAllPets:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getPet = async (req, res) => {
  try {
    const pet = await service.getPetById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    console.error('Error in getPet:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.createPet = async (req, res) => {
  try {
    const pet = await service.addPet(req.body);
    res.status(201).json(pet);
  } catch (error) {
    console.error('Error in createPet:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const updated = await service.updatePet(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error in updatePet:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.adoptPet = async (req, res) => {
  try {
    const adopted = await service.adoptPet(req.params.id);
    if (!adopted) {
      return res.status(404).json({ error: 'Pet not found or already adopted' });
    }
    res.json({ message: 'Pet adopted!', pet: adopted });
  } catch (error) {
    console.error('Error in adoptPet:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const deleted = await service.deletePet(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted.' });
  } catch (error) {
    console.error('Error in deletePet:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.filterByMood = async (req, res) => {
  try {
    const { mood } = req.query;
    const filtered = await service.filterPetsByMood(mood);
    res.json(filtered);
  } catch (error) {
    console.error('Error in filterByMood:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
