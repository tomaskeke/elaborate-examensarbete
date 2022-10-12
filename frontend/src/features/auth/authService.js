import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "@env";

axios.defaults.withCredentials = true

const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("saved successfully");
  } catch (error) {
    console.log(error);
  }
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/users/`, userData);
  if (response.data) {
    save("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/api/users/login/`, userData);

  if (response.data) {
    save("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
  console.log("done");
};

export const getUser = async (userId) => {
  const response = await axios.get(`${API_URL}/api/users/${userId}`);

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getUser,
};

export default authService;
