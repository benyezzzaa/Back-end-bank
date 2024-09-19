const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config(); // Load environment variables

// Import routes
const prospectRoutes = require('./routes/prospectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const supportRoutes =require('./routes/supportRoutes');
// Create an Express app
const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Ensure this is set in .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Define routes
app.use('/prospects', prospectRoutes);
app.use('/clients', clientRoutes);
app.use('/transactions', transactionRoutes);
app.use('/admin', adminRoutes);
app.use('/api', supportRoutes);
// Middleware to check session
function requireLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
}

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
