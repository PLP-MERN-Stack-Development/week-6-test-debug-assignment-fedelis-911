const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    if (process.env.DEBUG === 'true') {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        console.log('Body:', req.body);
    }
    next();
});

// Routes
app.use('/api/bugs', bugRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;