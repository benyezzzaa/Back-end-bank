import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        setError('Erreur lors de la récupération des utilisateurs.');
      }
    };
    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`/api/users/${selectedUser.id}`, selectedUser);
      setError('');
      alert('Utilisateur mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      setError('Erreur lors de la mise à jour de l\'utilisateur.');
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post('/api/users', newUser);
      setNewUser({ username: '', email: '', role: '' });
      setError('');
      alert('Utilisateur créé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      setError('Erreur lors de la création de l\'utilisateur.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-animation bg-size-200">
      <h2 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Créer un Nouvel Utilisateur</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Nom d'utilisateur:</label>
          <input
            type="text"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rôle:</label>
          <input
            type="text"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleCreateUser}
        >
          Créer
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nom d'utilisateur</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Rôle</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleSelectUser(user)}
                >
                  Éditer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Modifier l'Utilisateur</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Nom d'utilisateur:</label>
            <input
              type="text"
              value={selectedUser.username}
              onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rôle:</label>
            <input
              type="text"
              value={selectedUser.role}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleUpdateUser}
          >
            Mettre à jour
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
