import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Set your base URL here
  headers: {
    "Content-Type": "application/json",
  },
  // You can add more default config options here
});

export default apiClient;
