const bcrypt = require('bcrypt');
const db = require('./db');  // Assurez-vous de bien configurer la connexion à la base de données

async function updatePasswords() {
    try {
        // Sélectionner tous les clients
        const [clients] = await db.promise().query('SELECT cin FROM clients');

        for (let client of clients) {
            const hashedPassword = await bcrypt.hash(client.cin, 10);

            // Mettre à jour le mot de passe haché dans la base de données
            await db.promise().query('UPDATE clients SET password = ? WHERE cin = ?', [hashedPassword, client.cin]);
            console.log(`Password updated for CIN: ${client.cin}`);
        }

        console.log('All passwords have been updated.');
    } catch (error) {
        console.error('Error updating passwords:', error);
    }
}

updatePasswords();
