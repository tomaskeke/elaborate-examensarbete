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

const addEventMember = async (data, token) => {
  const config = {
      headers: {
          Authorization: "Bearer " + token,
      },
  }
  const response = await axios.put(`${API_URL}/api/events/${data.eventId}/addmember`, {invites: data.userId}, config)
  return response.data;
}


const removeEventMember = async (data, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.put(
    `${API_URL}/api/events/${data.eventId}/removemember`, {userId: data.userId},
    config
  );
  return response.data;
};

const getEventTodos = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get(`${API_URL}/api/events/${eventId}/todos`);
  return response.data;
};


const deleteEventTodo = async (eventId, token) => {
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
const removeEvent = async (eventId, token) => {
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
  addEventMember,
  deleteEventTodo,
  removeEventMember,
  removeEvent,
  updateEvent,
};

export default eventService;
