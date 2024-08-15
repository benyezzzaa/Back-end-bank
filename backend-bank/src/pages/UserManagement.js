import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    cin: '',
    firstname: '',
    lastname: '',
    email: '',
    adress: '',
    password: '' // Ajout du champ mot de passe pour l'ajout
  });
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients :', error);
        setError('Erreur lors de la récupération des clients.');
      }
    };
    fetchClients();
  }, []);

  const handleSelectClient = (client) => {
    setSelectedClient({ ...client, password: '' }); // Réinitialiser le mot de passe pour l'édition
  };

  const handleUpdateClient = async () => {
    try {
      await axios.put(`/clients/${selectedClient.cin}`, {
        firstname: selectedClient.firstname,
        lastname: selectedClient.lastname,
        newCin: selectedClient.cin, // Pour mettre à jour CIN si nécessaire
        email: selectedClient.email,
        adress: selectedClient.adress,
        password: selectedClient.password // Mettre à jour le mot de passe
      });
      setClients(clients.map(client =>
        client.cin === selectedClient.cin ? selectedClient : client
      ));
      setSelectedClient(null);
      setError('');
      alert('Client mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client :', error);
      setError('Erreur lors de la mise à jour du client.');
    }
  };

  const handleDeleteClient = async (cin) => {
    try {
      await axios.delete(`/clients/${cin}`);
      setClients(clients.filter(client => client.cin !== cin));
      setError('');
      alert('Client supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression du client :', error);
      setError('Erreur lors de la suppression du client.');
    }
  };

  const handleAddClient = async () => {
    try {
      await axios.post('/clients', newClient);
      setClients([...clients, newClient]);
      setNewClient({
        cin: '',
        firstname: '',
        lastname: '',
        email: '',
        adress: '',
        password: '' // Réinitialiser le mot de passe
      });
      setShowAddClientForm(false);
      setError('');
      alert('Client ajouté avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du client :', error);
      setError('Erreur lors de l\'ajout du client.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-animation bg-size-200 animate-gradientAnimation">
      <div className="max-w-8xl mx-auto mt-11 p-9 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h2>

        <table className="min-w-full bg-white border border-gray-500">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Prénom</th>
              <th className="py-2 px-4 border-b">CIN</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Adresse</th>
              <th className="py-2 px-4 border-b">Mot de Passe</th> {/* Ajout de la colonne mot de passe */}
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.cin}>
                <td className="py-2 px-4 border-b">{client.lastname}</td>
                <td className="py-2 px-4 border-b">{client.firstname}</td>
                <td className="py-2 px-4 border-b">{client.cin}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.adress}</td>
                <td className="py-2 px-4 border-b">{client.password}</td> {/* Affichage du mot de passe */}
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleSelectClient(client)}
                  >
                    Éditer
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    onClick={() => handleDeleteClient(client.cin)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedClient && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Modifier le client</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Nom:</label>
              <input
                type="text"
                value={selectedClient.lastname}
                onChange={(e) => setSelectedClient({ ...selectedClient, lastname: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Prénom:</label>
              <input
                type="text"
                value={selectedClient.firstname}
                onChange={(e) => setSelectedClient({ ...selectedClient, firstname: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CIN:</label>
              <input
                type="text"
                value={selectedClient.cin}
                onChange={(e) => setSelectedClient({ ...selectedClient, cin: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="text"
                value={selectedClient.email}
                onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Adresse:</label>
              <input
                type="text"
                value={selectedClient.adress}
                onChange={(e) => setSelectedClient({ ...selectedClient, adress: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mot de Passe:</label>
              <input
                type="password"
                value={selectedClient.password}
                onChange={(e) => setSelectedClient({ ...selectedClient, password: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleUpdateClient}
            >
              Enregistrer
            </button>
          </div>
        )}

        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => setShowAddClientForm(!showAddClientForm)}
        >
          {showAddClientForm ? 'Annuler' : 'Ajouter un Client'}
        </button>

        {showAddClientForm && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Ajouter un Client</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Nom:</label>
              <input
                type="text"
                value={newClient.lastname}
                onChange={(e) => setNewClient({ ...newClient, lastname: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Prénom:</label>
              <input
                type="text"
                value={newClient.firstname}
                onChange={(e) => setNewClient({ ...newClient, firstname: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CIN:</label>
              <input
                type="text"
                value={newClient.cin}
                onChange={(e) => setNewClient({ ...newClient, cin: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="text"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Adresse:</label>
              <input
                type="text"
                value={newClient.adress}
                onChange={(e) => setNewClient({ ...newClient, adress: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mot de Passe:</label>
              <input
                type="password"
                value={newClient.password}
                onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddClient}
            >
              Ajouter
            </button>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default UserManagement;
