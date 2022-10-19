import axios from "axios";
import {API_URL} from "@env";



const searchForFriends = async (query) => {
    const response = await axios.post(`${API_URL}/api/users/search/`, query)
    return response.data;
}


const searchService = {
    searchForFriends,
}

export default searchService;