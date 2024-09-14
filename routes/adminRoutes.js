const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Importer la base de données
const { check, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
// Route pour mettre à jour les informations du client
router.put('/clients/up', 
  authenticateToken, async (req, res) => {
  const clientId = req.user.id; // On récupère l'id du client à partir du token
  const {
      cin,
      firstname,
      lastname,
      email,
      adress,
      password, // Mot de passe si mis à jour
      twoFactorAuth,
      language,
      theme,
      // Vous pouvez ajouter ici d'autres champs à mettre à jour
  } = req.body;

  try {
      // Mettez à jour les informations du client
      await db.promise().query(
          'UPDATE clients SET cin = ?, firstname = ?, lastname = ?, email = ?, adress = ?, password = ?, twoFactorAuth = ?, language = ?, theme = ? WHERE id = ?',
          [cin, firstname, lastname, email, adress, password, twoFactorAuth, language, theme, clientId]
      );
      res.json({ message: 'Informations mises à jour avec succès.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour des informations.' });
  }
  console.log('Client ID:', req.user.id); 
});
// Route d'authentification admin
router.post('/login', [
  check('username').notEmpty().withMessage('Nom d\'utilisateur requis'),
  check('password').notEmpty().withMessage('Mot de passe requis')
], (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { username, password } = req.body;

  // Check if admin exists in the database (Assurez-vous d'utiliser la bonne table)
  db.query('SELECT * FROM Admins WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête SQL :', err);
      return res.status(500).json({ success: false, message: 'Erreur serveur (requête SQL)' });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    const admin = results[0];

    // Compare passwords
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) {
        console.error('Erreur lors de la comparaison des mots de passe :', err);
        return res.status(500).json({ success: false, message: 'Erreur serveur (comparaison de mot de passe)' });
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }

      // Create a JWT token
      const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '1h' });

      // Send back the token
      return res.status(200).json({ success: true, token });
    });
  });
});

module.exports = router;
