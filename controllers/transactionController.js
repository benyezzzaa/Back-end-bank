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

        res.json({
            success: true,
            token,
            clientId: client.id, // Assure-toi que l'ID du client est inclus
        });
    } catch (error) {
        console.error('Erreur lors de la connexion du client :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la connexion du client' });
    }
};
// Get all transactions for a specific client based on their CIN
const getClientTransactionsByCin = async (req, res) => {
    const clientCin = req.params.cin;
    try {
        const [transactions] = await db.query('SELECT * FROM transactions WHERE client_cin = ?', [clientCin]);
        if (transactions.length === 0) {
            return res.status(404).json({ message: 'Aucune transaction trouvée pour ce client' });
        }
        res.json(transactions);
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des transactions' });
    }
};

module.exports = { loginClient,getAll,rejectTransaction,approveTransaction,getClientTransactionsByCin };
