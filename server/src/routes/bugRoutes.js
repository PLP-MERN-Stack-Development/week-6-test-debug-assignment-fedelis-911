const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');
const { validateBug, validateBugUpdate } = require('../utils/validation');

// Debug helper
const debugLog = (message, data) => {
    if (process.env.DEBUG === 'true') {
        console.log(`[BugRoutes] ${message}`, data || '');
    }
};

// GET all bugs
router.get('/', async(req, res, next) => {
    try {
        debugLog('Fetching all bugs');
        const bugs = await Bug.find().sort({ createdAt: -1 });
        debugLog(`Found ${bugs.length} bugs`);
        res.json(bugs);
    } catch (error) {
        next(error);
    }
});

// GET single bug
router.get('/:id', async(req, res, next) => {
    try {
        debugLog('Fetching bug with ID:', req.params.id);
        const bug = await Bug.findById(req.params.id);
        if (!bug) {
            return res.status(404).json({ error: 'Bug not found' });
        }
        res.json(bug);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid bug ID' });
        }
        next(error);
    }
});

// POST create new bug
router.post('/', async(req, res, next) => {
    try {
        debugLog('Creating new bug:', req.body);

        // Validate input
        const validation = validateBug(req.body);
        if (!validation.isValid) {
            debugLog('Validation failed:', validation.errors);
            return res.status(400).json({ errors: validation.errors });
        }

        const bug = new Bug(req.body);
        const savedBug = await bug.save();
        debugLog('Bug created successfully:', savedBug._id);
        res.status(201).json(savedBug);
    } catch (error) {
        next(error);
    }
});

// PUT update bug
router.put('/:id', async(req, res, next) => {
    try {
        debugLog('Updating bug:', { id: req.params.id, data: req.body });

        // Validate input
        const validation = validateBugUpdate(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ errors: validation.errors });
        }

        const updatedBug = await Bug.findByIdAndUpdate(
            req.params.id, {...req.body, updatedAt: Date.now() }, { new: true, runValidators: true }
        );

        if (!updatedBug) {
            return res.status(404).json({ error: 'Bug not found' });
        }

        debugLog('Bug updated successfully');
        res.json(updatedBug);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid bug ID' });
        }
        next(error);
    }
});

// DELETE bug
router.delete('/:id', async(req, res, next) => {
    try {
        debugLog('Deleting bug:', req.params.id);
        const deletedBug = await Bug.findByIdAndDelete(req.params.id);

        if (!deletedBug) {
            return res.status(404).json({ error: 'Bug not found' });
        }

        debugLog('Bug deleted successfully');
        res.json({ message: 'Bug deleted successfully' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid bug ID' });
        }
        next(error);
    }
});

module.exports = router;