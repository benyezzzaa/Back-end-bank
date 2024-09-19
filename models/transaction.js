// models/Transaction.js
const db = require('../db');

const Transaction = {
    getAll: (callback) => {
        db.query('SELECT * FROM transactions', callback);
    },
    approve: (transactionId, callback) => {
        db.query('UPDATE transactions SET status = ? WHERE id = ?', ['approved', transactionId], callback);
    },
    reject: (transactionId, callback) => {
        db.query('UPDATE transactions SET status = ? WHERE id = ?', ['rejected', transactionId], callback);
    },
    getByClientCin: (cin, callback) => {
        db.query('SELECT * FROM transactions WHERE client_cin = ?', [cin], callback);
    },
    addTransaction: (clientCin, amount, transactionType, description, recipientCin, callback) => {
        db.query(
            'INSERT INTO transactions (client_cin, amount, transaction_type, description, recipient_cin) VALUES (?, ?, ?, ?, ?)',
            [clientCin, amount, transactionType, description, recipientCin],
            callback
        );
    }
};

module.exports = Transaction;
