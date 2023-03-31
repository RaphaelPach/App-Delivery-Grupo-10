import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

const loginHTTP = async (method, endpoint, body) => api
  .request({ method, url: endpoint, data: body })
  .then(({ status, data }) => ({ status, data }));

export default loginHTTP;
