const jwt = require('jsonwebtoken');
// Middleware de vérification du token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extraire le token

    if (!token) return res.status(401).json({ message: 'Token is missing. Please log in again.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide' });

        req.user = user; // Utilisateur authentifié
        next();
    });
};
  const generateToken = (client) => {
    return jwt.sign(
      { cin: client.cin },  // Les données que vous souhaitez inclure dans le token
      process.env.JWT_SECRET,  // Utilisez la même clé secrète pour signer et vérifier
      { expiresIn: '1h' }  // Durée de vie du token
    );
  };
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Récupère le token après 'Bearer'

    if (token == null) return res.status(401).json({ error: 'Token manquant. Veuillez vous reconnecter.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token invalide.' });

        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken,
    verifyToken,
    generateToken
};
