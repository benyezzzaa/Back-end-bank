// services/authService.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function generateToken(payload) {
  console.log('Payload pour le token:', payload);
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  console.log('Token généré:', token);
  return token;
}

module.exports = {
  generateToken,
};
