import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api/voter',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(config => {
  console.log('Sending request to:', config.url);
  return config;
});

export default api;