import axios from "axios";

const api = axios.create({
  baseURL: "https://www.ciadascompras.com.br/api", // seu backend PHP
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
