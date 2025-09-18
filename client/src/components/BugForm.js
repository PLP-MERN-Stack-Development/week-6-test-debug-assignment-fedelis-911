import React, { useState, useEffect } from 'react';

const BugForm = ({ onSubmit, editingBug, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');

    useEffect(() => {
        if (editingBug) {
            setTitle(editingBug.title || '');
            setDescription(editingBug.description || '');
            setPriority(editingBug.priority || 'Low');
        } else {
            setTitle('');
            setDescription('');
            setPriority('Low');
        }
    }, [editingBug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, priority });
        if (!editingBug) {
            setTitle('');
            setDescription('');
            setPriority('Low');
        }
    };

    return ( <
        form onSubmit = { handleSubmit } >
        <
        input type = "text"
        placeholder = "Title"
        value = { title }
        onChange = {
            (e) => setTitle(e.target.value)
        }
        required /
        >
        <
        textarea placeholder = "Description"
        value = { description }
        onChange = {
            (e) => setDescription(e.target.value)
        }
        required /
        >
        <
        select value = { priority }
        onChange = {
            (e) => setPriority(e.target.value)
        } >
        <
        option value = "Low" > Low < /option> <
        option value = "Medium" > Medium < /option> <
        option value = "High" > High < /option> < /
        select > <
        button type = "submit" > { editingBug ? 'Update Bug' : 'Add Bug' } < /button> {
        editingBug && < button type = "button"
        onClick = { onCancel } > Cancel < /button>} < /
        form >
    );
};

export default BugForm;