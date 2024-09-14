const db = require('../db');

const getOne = (req, res) => {
    const cin = req.params.cin;
    console.log(`Received request to check the client with cin: ${cin}`);
    
    db.query('SELECT * FROM clients WHERE cin = ? AND isProspect = true', [cin], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du client :', err);
            return res.status(500).send('Erreur du serveur');
        }

        if (result.length > 0) {
            // Si le client est trouvé et est un prospect
            res.json(result[0]);
        } else {
            // Si le CIN existe mais n'est pas un prospect
            res.json({ message: 'CIN trouvé mais ce n\'est pas un prospect.' });
        }
    });
};

// Fonction pour récupérer tous les clients qui sont des prospects
const getAllProspects = (req, res) => {
    db.query('SELECT * FROM clients WHERE isProspect = true', (err, results) => {
       
        if (err) {
            console.error('Erreur lors de la récupération des prospects :', err);
            return res.status(500).send('Erreur du serveur');
        }
        res.json(results);
    });
};

// Fonction pour récupérer les informations d'un client par CIN
const getClientInfo = (req, res) => {
    const cin = req.params.cin;

    if (!cin) {
        return res.status(400).json({ message: 'CIN est requis.' });
    }

    db.query('SELECT * FROM clients WHERE cin = ?', [cin], (err, response) => {
        if (err) {
            console.error('Erreur lors de la récupération des informations du client :', err);
            return res.status(500).json({ message: 'Erreur du serveur.' });
        }

        if (response.length === 0) {
            return res.status(404).json({ message: 'Client non trouvé.' });
        }

        res.json(response[0]);
    });
};

// Fonction pour vérifier et mettre à jour le statut d'un prospect par un admin
const adminCheck = (req, res) => {
    const { id, status, reason } = req.body;

    db.query('UPDATE clients SET status = ?, reason = ? WHERE id = ?', [status, reason, id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        db.query('SELECT * FROM clients WHERE id = ?', [id], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length > 0) {
                const prospect = results[0];
                sendEmail(prospect.email, status, reason);
                res.json({ success: true });
            } else {
                res.status(404).send('Prospect non trouvé');
            }
        });
    });
};

// Fonction pour envoyer un email
const sendEmail = (to, status, reason) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'fatmabenyezza17@gmail.com',
            pass: 'qqaa fldd lbqv vcf'
        }
    });

    const subject = status === 'approved' ? 'Votre demande est approuvée' : 'Votre demande est refusée';
    const text = status === 'approved' 
        ? 'Félicitations! Votre demande a été approuvée.' 
        : `Désolé, votre demande a été refusée. Raison : ${reason}`;

    const mailOptions = {
        from: 'fatmabenyezza17@gmail.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
        } else {
            console.log('Email envoyé à :', to);
            console.log('Sujet :', subject);
            console.log('Message :', text);
            console.log('Email envoyé :', info.response);
        }
    });
};

module.exports = {
   
    getAllProspects,
    getClientInfo,
    adminCheck,
    getOne
};
