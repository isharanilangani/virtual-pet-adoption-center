const service = require('../services/petService');

//view all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await service.getAllPets();
    res.json(pets);
  } catch (error) {
    console.error('Error in getAllPets:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

//view pet by pet Id
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

//create new pet
exports.createPet = async (req, res) => {
  try {
    const pet = await service.addPet(req.body);
    res.status(201).json(pet);
  } catch (error) {
    console.error('Error in createPet:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

//update pet
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

//update adopt status
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

//delete pet
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

//filter pet by mood
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

//filter pet by personality
exports.filterPetsByPersonality = async (req, res) => {
  try {
    const { personality } = req.query;
    const filtered = await service.filterPetsByPersonality(personality);
    res.json(filtered);
  } catch (error) {
    console.error('Error in filterPetsByPersonality:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
