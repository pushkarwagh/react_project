import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  // headers: {
  //   Authorization : `Bearer ${localStorage.getItem("access_token")}`
  // }
  
});

// API.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization =  token ? `Bearer ${token}` : '---';
//   return config;
// });

export default API;