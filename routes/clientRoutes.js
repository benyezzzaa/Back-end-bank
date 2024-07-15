const express = require('express');
const { getAllClients, checkClientExists } = require('../controllers/clientController');

const router = express.Router();

router.get('/', getAllClients);
router.post('/check-client', checkClientExists);

module.exports = router;
