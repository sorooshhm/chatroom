import axios from "axios";

const ApiInstance = axios.create({
  baseURL: "http://localhost:8585/api/",
  headers: {
    "x-auth-token": localStorage.getItem(btoa("user")) || "",
  },
});

export default ApiInstance
