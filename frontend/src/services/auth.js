import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// REGISTER
export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  const token = res.data.access_token;
  if (token) {
    localStorage.setItem("access_token", token);
    // 🔹 trigger global event supaya Navbar langsung update
    window.dispatchEvent(new Event("auth-change"));
  }
  return res;
};

// LOGIN
export const login = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  const token = res.data.access_token;
  if (token) {
    localStorage.setItem("access_token", token);
    // 🔹 trigger global event supaya Navbar langsung update
    window.dispatchEvent(new Event("auth-change"));
  }
  return res;
};

// LOGOUT
export const logout = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return Promise.resolve();

  return axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
