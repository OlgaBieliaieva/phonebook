import axios from "axios";

export const workspaceApiClient = axios.create({
  baseURL: "https://workspace-api-nthp.onrender.com/api/",
  // "https://workspace-api-production.up.railway.app/api/",
  // baseURL: "http://localhost:8000/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
