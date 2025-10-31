import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // ← comma fixed and formatted properly
});
console.log('API URL:', apiUrl); // Add this to verify
export default api;
