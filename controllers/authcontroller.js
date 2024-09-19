const bcrypt = require('bcrypt');
const db = require('../db'); // Modifie en fonction de l'emplacement de ton fichier de connexion à la base de données
const generateToken = require('../utils/token'); // Assure-toi du bon chemin

const loginClient = async (req, res) => {
    const { cin, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM clients WHERE cin = ?', [cin]);
        const client = rows[0];

        if (!client) {
            return res.status(401).json({ success: false, message: 'Client non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Mot de passe incorrect' });
        }

        // Générer le jeton
        const token = generateToken(client.cin);

        // Sauvegarder le CIN du client dans la session
        req.session.clientCIN = client.cin;

        // Réponse avec le jeton et la redirection
        res.json({
            success: true,
            token,
            redirectUrl: '/client',
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la connexion' });
    }
};

module.exports = loginClient;
