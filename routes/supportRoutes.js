// routes/supportRoutes.js
const express = require('express');
const router = express.Router();
const { handleSupportRequest, getSupportRequestsHandler } = require('../controllers/supportController');

// Route POST pour gérer les demandes de support
router.post('/support', handleSupportRequest);

// Route GET pour récupérer les demandes de support (pour le tableau de bord administratif)
router.get('/support', getSupportRequestsHandler);

module.exports = router;
