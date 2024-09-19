// controllers/supportController.js
const { saveSupportRequest, getSupportRequests } = require('../models/supportModel');

const handleSupportRequest = (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, message: 'Email et message sont requis.' });
  }

  saveSupportRequest(email, message, (err, results) => {
    if (err) {
      console.error('Erreur lors du traitement de la demande de support :', err);
      return res.status(500).json({ success: false, message: 'Erreur du serveur. Veuillez réessayer.' });
    }
    res.status(200).json({ success: true, message: 'Demande de support reçue avec succès.' });
  });
};

const getSupportRequestsHandler = (req, res) => {
  getSupportRequests((err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des demandes de support :', err);
      return res.status(500).json({ success: false, message: 'Erreur du serveur. Veuillez réessayer.' });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  handleSupportRequest,
  getSupportRequestsHandler,
};
