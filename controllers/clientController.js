const Client = require('../models/client');
const Prospect = require('../models/prospect');

const getAllClients = (req, res) => {
    Client.findAll((err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
};

const checkClientExists = (req, res) => {
    const { cin } = req.body;
    console.log('Received request to check the client with cin:', cin);  // Journalisation
    Client.findByCin(cin, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (results.length > 0) {
            console.log("creating prospect");
            Prospect.create(cin,null)    

            res.json({ exists: true, message: 'Waiting for admin approval' });
        } else {
            res.json({ exists: false, message: 'Client does not exist in the bank.' });
        }
    });
};

module.exports = {
    getAllClients,
    checkClientExists
};
