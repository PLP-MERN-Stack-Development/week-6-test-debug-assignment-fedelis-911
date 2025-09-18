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
    };

    const handleCreateBug = async(bugData) => {
        try {
            console.log('Creating bug:', bugData); // Debug log
            const newBug = await bugService.createBug(bugData);
            setBugs([newBug, ...bugs]);
            setError(null);
        } catch (err) {
            console.error('Error creating bug:', err); // Debug log
            setError('Failed to create bug. Please check your input.');
        }
    };

    const handleUpdateBug = async(id, updates) => {
        try {
            console.log('Updating bug:', { id, updates }); // Debug log
            const updatedBug = await bugService.updateBug(id, updates);
            setBugs(bugs.map(bug => bug._id === id ? updatedBug : bug));
            setEditingBug(null);
            setError(null);
        } catch (err) {
            console.error('Error updating bug:', err); // Debug log
            setError('Failed to update bug.');
        }
    };

    const handleDeleteBug = async(id) => {
        if (window.confirm('Are you sure you want to delete this bug?')) {
            try {
                console.log('Deleting bug:', id); // Debug log
                await bugService.deleteBug(id);
                setBugs(bugs.filter(bug => bug._id !== id));
                setError(null);
            } catch (err) {
                console.error('Error deleting bug:', err); // Debug log
                setError('Failed to delete bug.');
            }
        }
    };

    return ( <
        ErrorBoundary >
        <
        div className = "App" >
        <
        header className = "App-header" >
        <
        h1 > 🐛Bug Tracker < /h1> <
        /header> <
        main className = "App-main" > {
            error && ( <
                div className = "error-message"
                role = "alert" > { error } <
                button onClick = {
                    () => setError(null) } > ✕ < /button> <
                /div>
            )
        } <
        section className = "bug-form-section" >
        <
        h2 > { editingBug ? 'Edit Bug' : 'Report New Bug' } < /h2> <
        BugForm onSubmit = { editingBug ? (data) => handleUpdateBug(editingBug._id, data) : handleCreateBug }
        editingBug = { editingBug }
        onCancel = { editingBug ? () => setEditingBug(null) : null }
        /> <
        /section> <
        section className = "bug-list-section" >
        <
        h2 > Bug List < /h2> {
            loading ? ( <
                div className = "loading" > Loading bugs... < /div>
            ) : ( <
                BugList bugs = { bugs }
                onEdit = { setEditingBug }
                onDelete = { handleDeleteBug }
                />
            )
        } <
        /section> <
        /main> <
        /div> <
        /ErrorBoundary>
    );
}

export default App;