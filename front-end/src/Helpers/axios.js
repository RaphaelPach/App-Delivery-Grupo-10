import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

const loginHTTP = async ({ url, method, body, token }) => api
  .request({
    url,
    method,
    data: body,
    headers: {
      Authorization: token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(({ status, data }) => ({ status, data }));

export default loginHTTP;
