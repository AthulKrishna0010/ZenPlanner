// src/api.js
import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://zenplanner-de8a.onrender.com/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
