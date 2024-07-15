const Client = require('../models/client');

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
    const { email } = req.body;
    console.log('Received request to check client with email:', email);  // Journalisation
    Client.findByEmail(email, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (results.length > 0) {
            res.json({ exists: true, message: 'Client already exists in the bank.' });
        } else {
            res.json({ exists: false, message: 'Client does not exist in the bank.' });
        }
    });
};

module.exports = {
    getAllClients,
    checkClientExists
};
