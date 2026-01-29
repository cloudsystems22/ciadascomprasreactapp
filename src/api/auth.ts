import axios from "axios";

const api = axios.create({
  baseURL: "/api", // vai bater no seu PHP no servidor
  withCredentials: true,
});

export default api;
