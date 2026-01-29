import axios from "axios";

const api = axios.create({
  baseURL: "/api", // seu backend PHP
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
