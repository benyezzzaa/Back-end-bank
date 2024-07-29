const db = require('../db');

const Client = {
    findAll: (callback) => {
        const query = 'SELECT * FROM clients';
        db.query(query, callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM clients WHERE email = ?';
        db.query(query, [email], callback);
    },
    findByCin: (cin, callback) => {
        const query = 'SELECT * FROM clients WHERE cin = ?';
        db.query(query, [cin], callback);
        },
};

module.exports = Client;
