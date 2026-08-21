import axios from "axios";
import { getAuth } from "firebase/auth";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://cold-world-jump.loca.lt",
  headers: {
    "Content-Type": "application/json",
    "Bypass-Tunnel-Reminder": "true",
  },
});

API.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Retrieve fresh Firebase ID token
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Firebase Auth not initialized yet or user unauthenticated:", error.message);
    }

    // Ensure localltunnel bypass header is present on every request
    config.headers["Bypass-Tunnel-Reminder"] = "true";

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;