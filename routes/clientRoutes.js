const express = require('express');
const jwt = require('jsonwebtoken');

const { isAuthenticated } = require('../middleware/authMiddleware');
const {
    getAllClients,
    updateClient,
    deleteClient,
    checkClientExists,
    addClient,
    loginClient,
    getProspects,
    update,
    getClientInfo,
    getClientProfileAndTransactions, // Ajoutez ceci si ce n'est pas déjà fait
    ensureAuthenticated
} = require('../controllers/clientController'); // Assurez-vous que le chemin est correct

const router = express.Router();


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};

// Client routes
router.get('/', getAllClients); // Get all clients
router.post('/login', loginClient); // Login
router.post('/addClient',  addClient); // Add client
router.put('/:cin',  updateClient); // Update client
router.delete('/:cin',  deleteClient); // Delete client
router.post('/check', checkClientExists); // Check if client exists
router.get('/prospects',  getProspects); // Get prospects
router.put('/update', authenticateToken, update); // Update client info
router.get('/me', authenticateToken, getClientInfo); // Get client info
router.get('/account-management', authenticateToken, getClientProfileAndTransactions); // Account management
module.exports = router;
