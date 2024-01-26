import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api/',
  // baseURL: 'http://localhost:7071/api/',
});

export default axiosClient;
