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
    deleteByCin: (cin, callback) => {
        const query = 'DELETE FROM clients WHERE cin = ?';
        db.query(query, [cin], callback);
    },
    updateByCin: (cin, data, callback) => {
        const query = 'UPDATE clients SET ? WHERE cin = ?';
        db.query(query, [data, cin], callback);
    },
    add: (clientData, callback) => {
        return db.query('INSERT INTO clients SET ?', [clientData], callback);
    }

};

module.exports = Client;
