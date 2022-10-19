import axios from "axios";
import {API_URL} from "@env";
// create new event

const getFriendsList = async (token) => {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
    }
    const response = await axios.get(`${API_URL}/api/users/friendslist`, config)
    return response.data;
}

const sendFriendRequest = async (id, token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    }
    const response = await axios.post(`${API_URL}/api/users/${id}/addfriend`, "", config)
    return response.data;
}

const getFriendRequests = async (token) => {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
    }
    const response = await axios.get(`${API_URL}/api/users/friendrequests`, config)
    return response.data;
}

const getInitializedRequests = async (token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    }
    const response = await axios.get(`${API_URL}/api/users/sentfriendrequests`, config)
    return response.data;
}

const acceptFriendRequest = async (id, token) => {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
    }

    const response = await axios.post(`${API_URL}/api/users/${id}/acceptfriend`, "", config)
    return response.data;
}

const declineFriendRequest = async (id, token) => {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
    }
    const response = await axios.post(`${API_URL}/api/users/${id}/declinefriend`, "", config)
    return response.data;
}

const cancelPendingRequest = async (id, token) => {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
    }
    const response = await axios.post(`${API_URL}/api/users/${id}/cancelpending`, "", config)
    return response.data;
}

const removeFriend = async (id, token) => {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
    }
    const response = await axios.post(`${API_URL}/api/users/${id}/removefriend`, "", config)
    return response.data;
}


const friendsService = {
    getFriendsList,
    sendFriendRequest,
    getFriendRequests,
    getInitializedRequests,
    acceptFriendRequest,
    declineFriendRequest,
    cancelPendingRequest,
    removeFriend,
}

export default friendsService;

