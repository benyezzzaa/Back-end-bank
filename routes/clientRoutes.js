const express = require('express');


const jwt = require('jsonwebtoken');
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
    getClientProfileAndTransactions,
    logoutClient

} = require('../controllers/clientController');

const router = express.Router();
// Middleware pour vérifier le token JWT
/*const ensureAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token invalide' });
        req.clientCIN = decoded.cin;
        next();
    });
};*/
// Middleware to authenticate the JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, 'secret', (err, client) => { // Assure-toi que 'secret' est correct
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.client = client; // Sauvegarde les infos du client dans req.client
        next();
    });
}


// Client routes
router.get('/', getAllClients); // Get all clients
router.post('/login', loginClient); // Login
router.post('/addClient', addClient); // Add client
router.put('/:cin', updateClient); // Update client
router.delete('/:cin', deleteClient); // Delete client
router.post('/check', checkClientExists); // Check if client exists
router.get('/prospects', getProspects); // Get prospects
router.put('/update', authenticateToken, update); // Update client info
router.get('/me', authenticateToken, getClientInfo); // Get client info
router.get('/account-management', authenticateToken, getClientProfileAndTransactions);
router.post('/logout', logoutClient);

module.exports = router;
