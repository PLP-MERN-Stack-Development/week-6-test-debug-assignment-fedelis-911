import axios from 'axios';

const API_URL = '/api/bugs';

const getAllBugs = async() => {
    const response = await axios.get(API_URL);
    return response.data;
};

const createBug = async(bugData) => {
    const response = await axios.post(API_URL, bugData);
    return response.data;
};

const updateBug = async(id, bugData) => {
    const response = await axios.put(`${API_URL}/${id}`, bugData);
    return response.data;
};

const deleteBug = async(id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

const bugService = {
    getAllBugs,
    createBug,
    updateBug,
    deleteBug,
};

export default bugService;