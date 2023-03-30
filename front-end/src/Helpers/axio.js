import axios from 'axios';

/* require('dotenv').config(); */

export const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

export const loginHTTP = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};
