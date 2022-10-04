import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "http://10.0.2.2:5000";

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

const authService = {
  register,
  login,
  logout,
};

export default authService;
