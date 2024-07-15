const db = require('../db');

const Prospect = {
    create: (data, callback) => {
        const { firstname, lastname, email, adress } = data;
        db.query('INSERT INTO clients (firstname, lastname, email, adress) VALUES (?, ?, ?, ?)', [firstname, lastname, email, adress], callback);
    },
    updateStatus: (id, status, reason, callback) => {
        db.query('UPDATE clients SET status = ?, reason = ? WHERE id = ?', [status, reason, id], callback);
    },
    findById: (id, callback) => {
        db.query('SELECT * FROM clients WHERE id = ?', [id], callback);
    }
};

module.exports = Prospect;
