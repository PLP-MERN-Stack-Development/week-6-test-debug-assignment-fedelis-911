import React, { useState, useEffect } from 'react';

function BugForm({ onSubmit, initialData, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        status: 'open',
        assignee: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                priority: initialData.priority || 'medium',
                status: initialData.status || 'open',
                assignee: initialData.assignee || ''
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};

        if (!formData.title || formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters long';
        }

        if (!formData.description || formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters long';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData); // Debug log

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log('Validation errors:', validationErrors); // Debug log
            return;
        }

        onSubmit(formData);

        // Clear form only if creating new bug
        if (!initialData) {
            setFormData({
                title: '',
                description: '',
                priority: 'medium',
                status: 'open',
                assignee: ''
            });
        }
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return ( <
            form className = "bug-form"
            onSubmit = { handleSubmit }
            data - testid = "bug-form" >
            <
            div className = "form-group" >
            <
            label htmlFor = "title" > Title * < /label> <
            input type = "text"
            id = "title"
            name = "title"
            value = { formData.title }
            onChange = { handleChange }
            placeholder = "Enter bug title"
            aria - invalid = { errors.title ? 'true' : 'false' }
            /> {
            errors.title && ( <
                span className = "error"
                role = "alert" > { errors.title } < /span>
            )
        } <
        /div>

    <
    div className = "form-group" >
        <
        label htmlFor = "description" > Description * < /label> <
    textarea id = "description"
    name = "description"
    value = { formData.description }
    onChange = { handleChange }
    placeholder = "Describe the bug in detail"
    aria - invalid = { errors.description ? 'true' : 'false' }
    /> {
    errors.description && ( <
        span className = "error"
        role = "alert" > { errors.description } < /span>
    )
} <
/div>

<
div className = "form-row" >
    <
    div className = "form-group" >
    <
    label htmlFor = "priority" > Priority < /label> <
select id = "priority"
name = "priority"
value = { formData.priority }
onChange = { handleChange } >
    <
    option value = "low" > Low < /option> <
option value = "medium" > Medium < /option> <
option value = "high" > High < /option> < /
    select > <
    /div>

<
div className = "form-group" >
    <
    label htmlFor = "status" > Status < /label> <
select id = "status"
name = "status"
value = { formData.status }
onChange = { handleChange } >
    <
    option value = "open" > Open < /option> <
option value = "in-progress" > In Progress < /option> <
option value = "resolved" > Resolved < /option> < /
    select > <
    /div> < /
    div >

    <
    div className = "form-group" >
    <
    label htmlFor = "assignee" > Assignee < /label> <
input type = "text"
id = "assignee"
name = "assignee"
value = { formData.assignee }
onChange = { handleChange }
placeholder = "Assign to someone (optional)" /
    >
    <
    /div>

<
div className = "form-actions" >
    <
    button type = "submit"
className = "btn btn-primary" > { initialData ? 'Update Bug' : 'Report Bug' } <
    /button> {
onCancel && ( <
    button type = "button"
    className = "btn btn-secondary"
    onClick = { onCancel } >
    Cancel <
    /button>
)
} <
/div> < /
form >
);
}

export default BugForm;