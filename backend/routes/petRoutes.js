const express = require('express');
const router = express.Router();
const controller = require('../controllers/petController');

router.post('/pets', controller.createPet);
router.put('/pets/:id', controller.updatePet);
router.patch('/pets/:id/adopt', controller.adoptPet);
router.delete('/pets/:id', controller.deletePet);
router.get('/pets/filter', controller.filterByMood);
router.get('/pets/filter/personality', controller.filterPetsByPersonality);
router.get('/pets', controller.getAllPets);
router.get('/pets/:id', controller.getPet);

module.exports = router;
