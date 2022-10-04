import axios from "axios";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
const API_URL = "http://10.0.2.2:5000";
// create new event



const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios.post(API_URL + "/api/events", eventData, config);

  return response.data;
};

// Get user events
const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get(API_URL + "/api/events", config);

  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
};

export default eventService;
