// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token reçu:', token);

  if (!token) {
    return res.status(403).json({ message: 'Pas de token fourni' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log('Token décodé:', decoded);
    req.user = decoded; // Ajouter les informations du token à la requête
    next(); // Passer au middleware suivant ou à la route
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    res.status(403).json({ message: 'Token invalide' });
  }
}
const authenticateToken = (req, res, next) => {
  // Récupérer le token de l'en-tête Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Token après "Bearer "

  if (!token) {
    return res.sendStatus(401); // Aucun token fourni
  }

  // Vérification du token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token invalide ou expiré
    }

    // Attacher les informations de l'utilisateur à la requête
    req.user = user;
    next(); // Continuer vers la prochaine fonction middleware ou route
  });
  console.log('Authorization header:', req.headers['authorization']);
};

module.exports = { authenticateToken,verifyToken };
