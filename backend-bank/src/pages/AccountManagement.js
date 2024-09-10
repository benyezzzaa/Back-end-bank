import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AccountManagement = () => {
  const [client, setClient] = useState({
    cin: '',
    firstname: '',
    lastname: '',
    email: '',
    adress: '',
    accountType: '',
    accountStatus: '',  
    dateOpened: '',
    password: '',
    notifications: [],
    transactions: [],  // Initialisation à un tableau vide
    documents: [],
    securityQuestions: [],
    cards: [],
    language: 'fr',
    theme: 'light',
    twoFactorAuth: false,
    sessions: [],
    supportTickets: [],
  });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Récupère les informations de l'utilisateur connecté
        const response = await axios.get('/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setClient(response.data);  // Met à jour les informations du client
  
        // Récupère les transactions du client
        const transactionsResponse = await axios.get(`/clients/${response.data.cin}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setClient((prevState) => ({
          ...prevState,
          transactions: transactionsResponse.data, // Met à jour les transactions
        }));
  
      } catch (error) {
        console.error('Erreur lors de la récupération des informations du client :', error);
        setError('Erreur lors de la récupération des informations.');
      }
    };
  
    fetchClientData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleUpdateClient = async () => {
    if (!client.password) {
      setError('Le mot de passe est requis.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('/clients/up', client, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError('');
      alert('Informations mises à jour avec succès.');
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations :', error);
      setError('Erreur lors de la mise à jour des informations.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Gestion du Compte</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Information du client */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Informations Personnelles</h3>
          <div className="mb-4">
            <label className="block text-gray-700">CIN:</label>
            <input
              type="text"
              name="cin"
              value={client.cin}
              onChange={handleInputChange}
              disabled={!isEditing} 
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Prénom:</label>
            <input
              type="text"
              name="firstname"
              value={client.firstname}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nom:</label>
            <input
              type="text"
              name="lastname"
              value={client.lastname}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={client.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Adresse:</label>
            <input
              type="text"
              name="adress"
              value={client.adress}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe:</label>
            <input
              type="password"
              name="password"
              value={client.password}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {isEditing ? (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleUpdateClient}
            >
              Mettre à jour
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(true)}
            >
              Modifier
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Préférences de Notification</h3>
          {/* Implémentez les champs pour les préférences de notification ici */}
        </div>

        {/* Historique des transactions */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
  <h3 className="text-xl font-bold mb-4">Historique des Transactions</h3>
  {client.transactions && client.transactions.length > 0 ? (
  <ul>
    {client.transactions.map((transaction) => (
      <li key={transaction.id}>
        {transaction.date}: {transaction.amount} {transaction.currency} - {transaction.description}
      </li>
    ))}
  </ul>
) : (
  <p>Aucune transaction trouvée.</p>
)}
</div>

        {/* Sécurité du compte */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Sécurité du Compte</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Activer la Vérification en Deux Étapes (2FA):</label>
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={client.twoFactorAuth}
              onChange={(e) => setClient({ ...client, twoFactorAuth: e.target.checked })}
            />
          </div>
          {/* Ajouter la gestion des questions de sécurité ici */}
        </div>

        {/* Téléchargement de documents */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Documents et Relevés</h3>
          {/* Implémentez la liste de documents ici */}
        </div>

        {/* Préférences de l'utilisateur */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Préférences de l'Utilisateur</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Langue de l'Interface:</label>
            <select
              name="language"
              value={client.language}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
              {/* Ajouter d'autres options de langue ici */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Thème de l'Interface:</label>
            <select
              name="theme"
              value={client.theme}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              {/* Ajouter d'autres options de thème ici */}
            </select>
          </div>
        </div>

        {/* Sessions actives */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Séances Actives</h3>
          {/* Implémentez la gestion des sessions ici */}
        </div>

        {/* Gestion des cartes bancaires */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Gestion des Cartes Bancaires</h3>
          {/* Implémentez la gestion des cartes bancaires ici */}
        </div>

        {/* Gestion des tickets de support */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Tickets de Support</h3>
          {/* Implémentez la gestion des tickets de support ici */}
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
