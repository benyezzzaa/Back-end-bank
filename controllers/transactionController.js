// controllers/clientController.js
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/transaction');
// Get all transactions
const getAll = (req, res) => {
    Transaction.getAll((err, transactions) => {
        if (err) {
            console.error('Erreur lors de la récupération des transactions:', err);
            return res.status(500).json({ message: 'Erreur lors de la récupération des transactions' });
        }
        res.json(transactions);
    });
};
const approveTransaction = async (req, res) => {
    const { transactionId } = req.params;
    try {
        const [result] = await db.query(
            'UPDATE transactions SET status = ? WHERE id = ?',
            ['approved', transactionId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }
        res.json({ message: 'Transaction approuvée' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'approbation de la transaction' });
    }
};

const rejectTransaction = async (req, res) => {
    const { transactionId } = req.params;
    try {
        const [result] = await db.query(
            'UPDATE transactions SET status = ? WHERE id = ?',
            ['rejected', transactionId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }
        res.json({ message: 'Transaction rejetée' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors du rejet de la transaction' });
    }
};
// Connexion du client
const loginClient = async (req, res) => {
    const { cin, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM clients WHERE cin = ?', [cin]);
        const client = rows[0];
        
        if (!client) {
            return res.status(401).json({ success: false, message: 'Client non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ cin: client.cin }, 'secret', { expiresIn: '1h' });

        // Sauvegarder le CIN du client dans la session
        req.session.clientCIN = client.cin;

        // Redirection vers le dashboard
        res.json({
            success: true,
            token,
            redirectUrl: '/client',
        });
    } catch (error) {
        console.error('Erreur lors de la connexion du client :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la connexion du client' });
    }
};
// Get all transactions for a specific client based on their CIN
const getClientProfileAndTransactions = async (req, res) => {
    const clientCIN = req.session.clientCIN; // Assurer que le CIN est stocké dans la session après la connexion

    try {
        const [client] = await db.promise().query('SELECT * FROM clients WHERE cin = ?', [clientCIN]);

        if (client.length === 0) {
            return res.status(404).json({ message: 'Client non trouvé.' });
        }

        const [transactions] = await db.promise().query('SELECT * FROM transactions WHERE client_cin = ?', [clientCIN]);

        res.json({
            client: {
                cin: client[0].cin,
                firstname: client[0].firstname,
                lastname: client[0].lastname,
                email: client[0].email,
                adress: client[0].adress
            },
            transactions: transactions
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des informations:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des informations.' });
    }
};


module.exports = { loginClient,getAll,rejectTransaction,approveTransaction,getClientProfileAndTransactions };
