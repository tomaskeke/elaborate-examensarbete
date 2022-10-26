import axios from "axios";
import { API_URL } from "@env";
// create new event

axios.defaults.withCredentials = true;

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
const getOneEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get(`${API_URL}/api/events/${eventId}`, config);

  return response.data;
};

const getEventMembers = async (eventData) => {
  const response = await axios.get(
    API_URL + "/api/events/" + eventData + "/members"
  );
  return response.data;
};


const getEventTodos = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get(`${API_URL}/api/events/${eventId}/todos`, config);
  return response.data;
};


const deleteEventTodo = async (token, eventId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.delete(
    API_URL + "/api/events/" + eventId + "/removeTodo",
    config
  );
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
  getEventMembers,
  getEventTodos,
  deleteEventTodo,
  removeEvent,
  updateEvent,
};

export default eventService;
