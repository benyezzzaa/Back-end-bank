// createAdmin.js

const bcrypt = require('bcryptjs');
const db = require('./db');



bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Erreur lors du hachage du mot de passe:', err);
    return;
  }

  const query = 'INSERT INTO admins (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, email], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'insertion de l\'administrateur:', err);
    } else {
      console.log('Administrateur ajouté avec succès.');
    }
    db.end(); // Fermer la connexion après l'insertion
  });
});
