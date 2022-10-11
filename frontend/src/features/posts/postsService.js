import axios from "axios";
const API_URL = "http://192.168.0.12:5000";

const getEventPosts = async (eventId) => {
  const response = await axios.get(
    API_URL + "/api/events/" + eventId + "/eventposts"
  );
  return response.data;
};

const postsService = {
  getEventPosts,
};

export default postsService;
