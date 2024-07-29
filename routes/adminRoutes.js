// routes/adminRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
router.post('/login', [
    // Validation des entrées
    check('username').notEmpty().withMessage('Nom d\'utilisateur requis'),
    check('password').notEmpty().withMessage('Mot de passe requis')
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Erreurs de validation:', errors.array()); // Log des erreurs
      return res.status(400).json({ success: false, errors: errors.array() });
    }
  
    const { username, password } = req.body;
  
    // Rechercher l'administrateur par nom d'utilisateur
    db.query('SELECT * FROM admins WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('Erreur lors de la recherche de l\'administrateur:', err);
        return res.status(500).json({ success: false, message: 'Erreur serveur' });
      }
  
      if (results.length === 0) {
        return res.status(400).json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }
  
      const admin = results[0];
  
    

      // Vérifier le mot de passe
      bcrypt.compare(password, admin.password, (err, isMatch) => {


        if (err) {
          console.error('Erreur lors de la comparaison des mots de passe:', err);
          return res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
  
        if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
  
        // Créer un token JWT
        const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '1h' });
  
        res.json({ success: true, token });
      });
    });
  });
module.exports = router;
