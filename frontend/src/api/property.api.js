import api from "./axios";

export const getAllProperties = async (filters = {}) => {
  const res = await api.get("/properties", { params: filters });
  return res.data;
};

export const getPropertyById = async (id) => {
  const res = await api.get(`/properties/${id}`);
  return res.data;
};
