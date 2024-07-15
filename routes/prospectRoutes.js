const express = require('express');
const { createProspect, adminCheck, checkClientExists } = require('../controllers/ProspectController');

const router = express.Router();

router.post('/', createProspect);
router.post('/admin-check', adminCheck);


module.exports = router;
