const jwt = require('jsonwebtoken');
require('dotenv').config(); // Assure-toi que c'est au début du fichier

const generateToken = (cin) => {
    const secretKey = process.env.JWT_SECRET; // Utiliser la clé d'environnement
    const token = jwt.sign({ cin }, secretKey, { expiresIn: '1h' });
    return token;
};

module.exports = generateToken;
