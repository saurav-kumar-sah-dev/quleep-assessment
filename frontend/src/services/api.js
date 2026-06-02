import axios from 'axios';

const API_BASE_URL = 'https://quleep-assessment.onrender.com/api';

export const getAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  console.log("API HIT:", API_BASE_URL); // ADD THIS
  return axios.post(`${API_BASE_URL}/products`, productData);
};