import axios from "axios";
import {API_URL} from "@env";


const getTodos = async (token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    const response = await axios.get(`${API_URL}/api/todos`, config)
    return response.data;
}
const addTodo = async (todoDetails, token) => {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        }
    }
    const response = await axios.post(`${API_URL}/api/todos/`, todoDetails, config)
    return response.data;
}

const getEventTodos = async (eventId, token) => {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        }
    }
    const response = await axios.get(`${API_URL}/api/events/${eventId}/todos`, config)
    return response.data;
}

const todoService = {
    addTodo,
    getTodos,
    getEventTodos,
}

export default todoService;