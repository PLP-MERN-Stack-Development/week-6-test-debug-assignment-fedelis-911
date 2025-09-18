import React from 'react';

function BugItem({ bug, onUpdateStatus, onDelete, onEdit }) {
    const handleStatusChange = () => {
        const statusFlow = {
            'open': 'in-progress',
            'in-progress': 'resolved',
            'resolved': 'open'
        };

        const newStatus = statusFlow[bug.status];
        console.log(`Changing status from ${bug.status} to ${newStatus}`); // Debug log
        onUpdateStatus(bug._id, { status: newStatus });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return ( <
        div className = "bug-item"
        data - testid = "bug-item" >
        <
        div className = "bug-header" >
        <
        h3 className = "bug-title" > { bug.title } < /h3> < /
        div >

        <
        div className = "bug-badges" >
        <
        span className = { `badge status-${bug.status}` } > { bug.status } <
        /span> <
        span className = { `badge priority-${bug.priority}` } > { bug.priority }
        priority <
        /span> < /
        div >

        <
        p className = "bug-description" > { bug.description } < /p>

        <
        div className = "bug-meta" >
        <
        div >
        <
        div className = "bug-assignee" >
        Assignee: { bug.assignee || 'Unassigned' } <
        /div> <
        small > Created: { formatDate(bug.createdAt) } < /small> < /
        div >

        <
        div className = "bug-actions" >
        <
        button className = "btn btn-small btn-status"
        onClick = { handleStatusChange }
        aria - label = { `Change status from ${bug.status}` } >
        Update Status <
        /button> <
        button className = "btn btn-small btn-edit"
        onClick = {
            () => onEdit(bug)
        }
        aria - label = "Edit bug" >
        Edit <
        /button> <
        button className = "btn btn-small btn-delete"
        onClick = {
            () => onDelete(bug._id)
        }
        aria - label = "Delete bug" >
        Delete <
        /button> < /
        div > <
        /div> < /
        div >
    );
}

export default BugItem;