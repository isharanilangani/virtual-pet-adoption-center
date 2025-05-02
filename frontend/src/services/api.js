import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:10000/api",
});

export const getPets = () => API.get("/pets");
export const getPet = (id) => API.get(`/pets/${id}`);
export const addPet = (pet) => API.post("/pets", pet);
export const updatePet = (id, pet) => API.put(`/pets/${id}`, pet);
export const deletePet = (id) => API.delete(`/pets/${id}`);
export const adoptPet = (id) => API.patch(`/pets/${id}/adopt`);
export const filterByMood = (mood) => API.get(`/pets/filter?mood=${mood}`);
