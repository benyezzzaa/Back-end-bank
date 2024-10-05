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
// Ajouter une transaction
const addTransaction = async (req, res) => {
    const { client_cin, recipient_cin, amount, transaction_type, description } = req.body;

    try {
        // Vérifier si le client émetteur existe
        const [clientSender] = await db.query('SELECT * FROM clients WHERE cin = ?', [client_cin]);
        if (!clientSender.length) {
            return res.status(404).json({ message: 'Client émetteur non trouvé' });
        }

        // Vérifier si le client destinataire existe
        const [clientRecipient] = await db.query('SELECT * FROM clients WHERE cin = ?', [recipient_cin]);
        if (!clientRecipient.length) {
            return res.status(404).json({ message: 'Client destinataire non trouvé' });
        }

        // Insérer la transaction dans la base de données
        const [result] = await db.query(
            'INSERT INTO transactions (client_cin, recipient_cin, amount, transaction_type, description) VALUES (?, ?, ?, ?, ?)',
            [client_cin, recipient_cin, amount, transaction_type, description]
        );

        res.status(201).json({ message: 'Transaction ajoutée avec succès', transactionId: result.insertId });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la transaction:', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la transaction' });
    }
};

// Get all transactions for a specific client based on their CIN
// Get all transactions for a specific client based on their CIN
// Get all transactions for a specific client based on their CIN
const getClientProfileAndTransactions = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token manquant. Veuillez vous reconnecter.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const clientCIN = decoded.cin;

        // Récupérer les informations du client
        const [client] = await db.promise().query('SELECT * FROM clients WHERE cin = ?', [clientCIN]);

        if (client.length === 0) {
            return res.status(404).json({ message: 'Client non trouvé.' });
        }

        // Récupérer les transactions avec les informations du destinataire et inclure recipient_cin
        const [transactions] = await db.promise().query(`
            SELECT t.*, r.firstname AS recipient_firstname, r.lastname AS recipient_lastname, t.recipient_cin
            FROM transactions t
            JOIN clients r ON t.recipient_cin = r.cin
            WHERE t.client_cin = ?
        `, [clientCIN]);

        res.json({
            client: {
                cin: client[0].cin,
                firstname: client[0].firstname,
                lastname: client[0].lastname,
                email: client[0].email,
                adress: client[0].adress
            },
            transactions: transactions.map(transaction => ({
                id: transaction.id,
                amount: transaction.amount,
                date: transaction.date,
                recipient_firstname: transaction.recipient_firstname,
                recipient_lastname: transaction.recipient_lastname,
                recipient_cin: transaction.recipient_cin // Inclure recipient_cin ici
            }))
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des informations:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des informations.' });
    }
};



module.exports = { addTransaction,loginClient,getAll,rejectTransaction,approveTransaction,getClientProfileAndTransactions };