const db = require('../db');


const Prospect = {
    create: (data, callback) => {
        console.log(data);
        
        db.query('INSERT INTO prospects (cin) VALUES (?)', 
            [data], callback);
    },   
    updateStatus: (id, status, reason, callback) => {
        db.query('UPDATE prospects SET status = ?, reason = ? WHERE id = ?', [status, reason, id], callback);
    },
    findByCin: (cin, callback) => {
        db.query('SELECT * FROM prospects WHERE cin = ?', [cin], callback);
    },
    
    getAll : (callback) =>{
        db.query("SELECT * FROM prospects",callback);
    }

};


module.exports = Prospect;
