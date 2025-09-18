// Validation utility functions
const validateBug = (data) => {
    const errors = [];

    // Title validation
    if (!data.title) {
        errors.push('Title is required');
    } else if (data.title.length < 3) {
        errors.push('Title must be at least 3 characters long');
    } else if (data.title.length > 100) {
        errors.push('Title cannot exceed 100 characters');
    }

    // Description validation
    if (!data.description) {
        errors.push('Description is required');
    } else if (data.description.length < 10) {
        errors.push('Description must be at least 10 characters long');
    } else if (data.description.length > 500) {
        errors.push('Description cannot exceed 500 characters');
    }

    // Status validation
    if (data.status && !['open', 'in-progress', 'resolved'].includes(data.status)) {
        errors.push('Invalid status. Must be open, in-progress, or resolved');
    }

    // Priority validation
    if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
        errors.push('Invalid priority. Must be low, medium, or high');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

const validateBugUpdate = (data) => {
    const errors = [];

    // Title validation (if provided)
    if (data.title !== undefined) {
        if (data.title.length < 3) {
            errors.push('Title must be at least 3 characters long');
        } else if (data.title.length > 100) {
            errors.push('Title cannot exceed 100 characters');
        }
    }

    // Description validation (if provided)
    if (data.description !== undefined) {
        if (data.description.length < 10) {
            errors.push('Description must be at least 10 characters long');
        } else if (data.description.length > 500) {
            errors.push('Description cannot exceed 500 characters');
        }
    }

    // Status validation (if provided)
    if (data.status && !['open', 'in-progress', 'resolved'].includes(data.status)) {
        errors.push('Invalid status. Must be open, in-progress, or resolved');
    }

    // Priority validation (if provided)
    if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
        errors.push('Invalid priority. Must be low, medium, or high');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateBug,
    validateBugUpdate
};