import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountManagement = () => {
  const [client, setClient] = useState({
    cin: '',
    firstname: '',
    lastname: '',
    email: '',
    adress: '',
    password: '', // Ajouter le champ du mot de passe
  });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClient(response.data);
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
    // Validation du mot de passe
    if (!client.password) {
      setError('Le mot de passe est requis.');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/clients/update', client, {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-animation bg-size-200">
      <h2 className="text-2xl font-bold mb-4">Gestion du Compte</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">CIN:</label>
          <input
            type="text"
            name="cin"
            value={client.cin}
            onChange={handleInputChange}
            disabled
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
    </div>
  );
};

export default AccountManagement;
