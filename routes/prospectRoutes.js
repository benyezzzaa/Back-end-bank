const express = require('express');
const { getProspectByCin, getAllProspects, getClientInfo, adminCheck, getOne } = require('../controllers/ProspectController');

const router = express.Router();
router.get('/:cin', getOne); // Assurez-vous que cette ligne est correcte


// Route pour récupérer tous les prospects
router.get('/all', getAllProspects);

// Route pour vérifier les informations d'un client par CIN
router.get('/client-info/:cin', getClientInfo);

// Route pour que l'admin vérifie et mette à jour le statut d'un prospect
router.post('/admin-check', adminCheck);

module.exports = router;
