const mysql = require('mysql2');
const db = require('../db');
// Fonction pour enregistrer une demande de support
const saveSupportRequest = (email, message, callback) => {
    const query = 'INSERT INTO support_requests (email, message) VALUES (?, ?)';
    connection.query(query, [email, message], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  };
  
  // Fonction pour récupérer toutes les demandes de support
  const getSupportRequests = (callback) => {
    const query = 'SELECT * FROM support_requests';
    connection.query(query, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  };
  module.exports = {
    saveSupportRequest,
    getSupportRequests,
  };