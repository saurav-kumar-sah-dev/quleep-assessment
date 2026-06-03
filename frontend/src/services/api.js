import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/products`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${API_BASE_URL}/api/products`, productData);
  return response.data;
};