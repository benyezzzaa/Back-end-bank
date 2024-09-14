const express = require('express');
const router = express.Router();
const db = require('../db'); // Assure-toi que ce chemin est correct
const { getAll, approveTransaction, rejectTransaction } = require('../controllers/transactionController');

// Route pour obtenir toutes les transactions
router.get('/all', getAll);

// Route pour approuver une transaction
router.post('/approve/:transactionId', approveTransaction);

// Route pour rejeter une transaction
router.post('/reject/:transactionId', rejectTransaction);

// Route pour ajouter une nouvelle transaction
router.post('/add', async (req, res) => {
    const { client_cin, amount, transaction_type, description } = req.body;

    console.log('Données reçues:', { client_cin, amount, transaction_type, description });

    if (!client_cin || !amount || !transaction_type || !description) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    try {
        // Utiliser la promesse pour la connexion à la base de données
        const [result] = await db.promise().query(
            'INSERT INTO transactions (client_cin, amount, transaction_type, description) VALUES (?, ?, ?, ?)',
            [client_cin, amount, transaction_type, description]
        );
        console.log('Résultat de l\'insertion:', result);
        res.status(201).json({ id: result.insertId });
    } catch (sqlError) {
        console.error('Erreur SQL:', sqlError); // Log des erreurs SQL spécifiques
        res.status(500).json({ error: sqlError.message });
    }
});

// Route pour obtenir les transactions d'un client
router.get('/client/:cin', async (req, res) => {
    const clientCin = req.params.cin;
    try {
        const [transactions] = await db.promise().query('SELECT * FROM transactions WHERE client_cin = ?', [clientCin]);
        res.json(transactions);
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des transactions' });
    }
});

module.exports = router;
