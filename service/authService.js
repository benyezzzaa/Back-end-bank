const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
    const secretKey = process.env.JWT_SECRET;
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        console.error('Jeton invalide ou expiré', error);
        return null;
    }
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assume Bearer token format

    if (token == null) return res.sendStatus(401);

    const decoded = verifyToken(token);
    if (decoded) {
        req.client = decoded; // Attacher les informations décodées à la requête
        next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = authenticateToken;
