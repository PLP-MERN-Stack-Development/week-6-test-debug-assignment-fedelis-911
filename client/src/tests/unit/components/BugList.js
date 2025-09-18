import React from 'react';
import BugItem from './BugItem';

function BugList({ bugs, onUpdateStatus, onDelete, onEdit }) {
    if (!bugs || bugs.length === 0) {
        return ( <
            div className = "bug-list-empty"
            data - testid = "empty-list" >
            <
            p > No bugs reported yet. < /p> <
            p > Create your first bug report using the form above. < /p> < /
            div >
        );
    }

    return ( <
        div className = "bug-list"
        data - testid = "bug-list" > {
            bugs.map(bug => ( <
                BugItem key = { bug._id }
                bug = { bug }
                onUpdateStatus = { onUpdateStatus }
                onDelete = { onDelete }
                onEdit = { onEdit }
                />
            ))
        } <
        /div>
    );
}

export default BugList;