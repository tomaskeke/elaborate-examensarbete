import axios from "axios";
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
const getOneEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get(API_URL + "/api/events/" + eventData, config);

  return response.data;
};
const updateEvent = async (eventData, eventId, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.put(
    `${API_URL}/api/events/${eventId}`,
    eventData,
    config
  );

  return response.data;
};
const removeEvent = async (token, eventId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.delete(
    API_URL + "/api/events/" + eventId,
    config
  );
  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
  getOneEvent,
  removeEvent,
  updateEvent,
};

export default eventService;
