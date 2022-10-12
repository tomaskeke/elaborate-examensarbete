import axios from "axios";
import {API_URL} from "@env";

axios.defaults.withCredentials = true

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
