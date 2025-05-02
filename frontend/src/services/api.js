import axios from 'axios';

const API_URL = 'http://localhost:10000/api/pets';

export const getAllPets = () => axios.get(API_URL);
export const addPet = (data) => axios.post(API_URL, data);
export const adoptPet = (id) => axios.patch(`${API_URL}/${id}/adopt`);
export const updatePet = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePet = (id) => axios.delete(`${API_URL}/${id}`);
export const filterPetsByMood = (mood) => axios.get(`${API_URL}?mood=${mood}`);
