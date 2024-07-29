const express = require('express');
const db = require('../db');
const { createProspect, adminCheck, getAll, getOne, getClientInfo,  } = require('../controllers/ProspectController');
const Prospect = require('../models/prospect');
const Client = require('../models/client');

const router = express.Router();

// Route pour récupérer un prospect par CIN
router.get('/get_by_cin/:cin', (req, res) => {
    console.log("prospect get all");
    const cin = req.params.cin;

    Prospect.findByCin(cin, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du prospect par CIN :', err);
            res.status(500).send('Erreur du serveur');
        } else {
            if (result.length > 0) {
                Client.findByCin(cin,(err , result)=>{
                    console.log(result);
                    res.json(result)
                })
            } else {
                res.status(404).send('Prospect non trouvé');
            }
        }
    });
});


router.post('/', createProspect);
router.get("/all",getAll)
router.post('/admin-check', adminCheck);
router.get("/client-info/:cin" , getClientInfo)
router.get('/:cin', getOne);


module.exports = router;
