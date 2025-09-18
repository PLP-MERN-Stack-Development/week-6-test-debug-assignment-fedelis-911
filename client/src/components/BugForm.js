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
            input type = "text"
            placeholder = "Title"
            value = { title }
            onChange = {
                (e) => setTitle(e.target.value) }
            required /
            >
            <
            textarea placeholder = "Description"
            value = { description }
            onChange = {
                (e) => setDescription(e.target.value) }
            required /
            >
            <
            select value = { priority }
            onChange = {
                (e) => setPriority(e.target.value) } >
            <
            option value = "Low" > Low < /option> <
            option value = "Medium" > Medium < /option> <
            option value = "High" > High < /option> <
            /select> <
            button type = "submit" > { editingBug ? 'Update Bug' : 'Add Bug' } < /button> {
                editingBug && < button type = "button"
                onClick = { onCancel } > Cancel < /button>} <
                    /form>
            );
        };

        export default BugForm;