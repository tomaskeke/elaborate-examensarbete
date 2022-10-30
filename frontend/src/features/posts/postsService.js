import axios from "axios";
import {API_URL} from "@env";

axios.defaults.withCredentials = true

const setEventPost = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.post(
    API_URL + "/api/events/" + eventData.service + "/posts", {content: eventData.content}, config );
  return response.data;
};


const getEventPosts = async (eventId) => {
  const response = await axios.get(
    `${API_URL}/api/events/${eventId}/eventposts`
  );
  return response.data;
};

const postsService = {
  getEventPosts,
  setEventPost
};

export default postsService;
