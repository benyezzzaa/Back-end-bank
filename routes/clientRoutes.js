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
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Récupère le token à partir des en-têtes

    if (token == null) {
        console.log('Token manquant'); // Ajoute un message dans les logs
        return res.status(403).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error('Erreur de validation du token :', err); // Ajoute un message dans les logs
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = user; // Attache les informations de l'utilisateur à la requête
        next(); // Passe au prochain middleware ou route
    });
};


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
module.exports = router;
