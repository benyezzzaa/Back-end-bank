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
    }
};

module.exports = Transaction;
