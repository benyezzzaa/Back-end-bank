const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAllClients = async (req, res) => {
    try {
        const [clients] = await db.promise().query('SELECT * FROM clients');
        res.json(clients);
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des clients.' });
    }
};

const updateClient = async (req, res) => {
    const { cin } = req.params;
    const { firstname, lastname, newCin, email, adress } = req.body;

    try {
        const [results] = await db.promise().query(
            'UPDATE clients SET firstname = ?, lastname = ?, cin = ?, email = ?, adress = ? WHERE cin = ?',
            [firstname, lastname, newCin, email, adress, cin]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Client non trouvé.' });
        }

        res.status(200).json({ message: 'Client mis à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du client :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du client.' });
    }
};

const deleteClient = async (req, res) => {
    const { cin } = req.params;

    try {
        await db.promise().query('DELETE FROM clients WHERE cin = ?', [cin]);
        res.json({ success: true });
    } catch (error) {
        console.error('Erreur lors de la suppression du client :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du client.' });
    }
};

const addClient = async (req, res) => {
    const { cin, firstname, lastname, email, adress, password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Le mot de passe est requis.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.promise().query(
            'INSERT INTO clients (cin, firstname, lastname, email, adress, password, isProspect) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cin, firstname, lastname, email, adress, hashedPassword, false]
        );
        res.status(201).json({ message: 'Client ajouté avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du client :', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du client.' });
    }
};


const loginClient = async (req, res) => {
    const { cin, password } = req.body;

    if (!cin || !password) {
        return res.status(400).json({ message: 'CIN et mot de passe sont requis.' });
    }

    try {
        const [client] = await db.promise().query('SELECT * FROM clients WHERE cin = ?', [cin]);
        if (client.length === 0) {
            return res.status(401).json({ success: false, message: 'Client non trouvé.' });
        }

        const clientData = client[0];
        const passwordMatch = await bcrypt.compare(password, clientData.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Mot de passe incorrect.' });
        }

        if (!clientData.isProspect) {
            await db.promise().query('UPDATE clients SET isProspect = true WHERE cin = ?', [cin]);
        }

        // Génération du token JWT avec la clé secrète
        const token = jwt.sign({ cin: clientData.cin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token JWT généré:', token);
        res.json({ success: true, token, clientData }); // Inclure clientData dans la réponse
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};
const logoutClient = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion:', err);
            return res.status(500).json({ message: 'Erreur lors de la déconnexion.' });
        }
        res.status(200).json({ message: 'Déconnexion réussie.' });
    });
};
const getProspects = async (req, res) => {
    try {
        const [prospects] = await db.promise().query('SELECT * FROM clients WHERE isProspect = true');
        res.status(200).json(prospects);
    } catch (error) {
        console.error('Erreur lors de la récupération des prospects :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des prospects.' });
    }
};

const checkClientExists = async (req, res) => {
    const { cin } = req.body;

    if (!cin) {
        return res.status(400).json({ message: 'CIN est requis.' });
    }

    try {
        const [client] = await db.promise().query('SELECT * FROM clients WHERE cin = ?', [cin]);

        if (client.length > 0) {
            res.json({ exists: true, message: 'Client existe dans la banque.' });
        } else {
            res.json({ exists: false, message: 'Client n\'existe pas dans la banque.' });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du client :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};


const update = async (req, res) => {
    const { cin, firstname, lastname, email, adress, password, twoFactorAuth } = req.body;

    try {
        const [clientExists] = await db.promise().query('SELECT * FROM clients WHERE cin = ?', [cin]);
        if (clientExists.length === 0) {
            return res.status(400).json({ error: 'Client non trouvé.' });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : clientExists[0].password;

        await db.promise().query(
            'UPDATE clients SET firstname = ?, lastname = ?, email = ?, adress = ?, password = ?, twoFactorAuth = ? WHERE cin = ?',
            [firstname, lastname, email, adress, hashedPassword, twoFactorAuth, cin]
        );

        res.json({ message: 'Informations mises à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du client:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour des informations.' });
    }
};

const getClientInfo = (req, res) => {
    const clientCIN = req.session.clientCIN; // Assuming session stores the logged-in client's CIN
    if (!clientCIN) {
        return res.status(403).json({ message: 'Forbidden - No Access Rights' });
    }

    Client.findOne({ where: { CIN: clientCIN } })
        .then(client => {
            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }
            res.json(client);
        })
        .catch(err => {
            res.status(500).json({ message: 'Server Error' });
        });
};

// Obtenir le profil du client et les transactions
// Get all transactions for a specific client based on their CIN
// Get all transactions for a specific client based on their CIN
const getClientProfileAndTransactions = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token manquant. Veuillez vous reconnecter.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const clientCIN = decoded.cin;

        const [client] = await db.promise().query('SELECT * FROM clients WHERE cin = ?', [clientCIN]);
        if (client.length === 0) {
            return res.status(404).json({ message: 'Client non trouvé.' });
        }

        const [transactions] = await db.promise().query('SELECT * FROM transactions WHERE client_cin = ?', [clientCIN]);

        res.json({
            client: {
                cin: client[0].cin,
                firstname: client[0].firstname,
                lastname: client[0].lastname,
                email: client[0].email,
                adress: client[0].adress
            },
            transactions: transactions
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des informations:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des informations.' });
    }
};

// Middleware pour vérifier le token JWT
const ensureAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('Token manquant');
        return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Erreur de vérification du token:', err);
            return res.status(403).json({ message: 'Token invalide' });
        }
        console.log('Token décodé:', decoded);
        req.clientCIN = decoded.cin;
        next();
    });
}

module.exports = {
    getAllClients,
    updateClient,
    deleteClient,
    addClient,
    loginClient,
    checkClientExists,
    getProspects,
    update,
    getClientInfo,
    getClientProfileAndTransactions,
    ensureAuthenticated,
    logoutClient
};
