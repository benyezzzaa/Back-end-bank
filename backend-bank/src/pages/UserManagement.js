import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/client');
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
      await axios.put(`/client/${selectedUser.id}`, selectedUser);
      setError('');
      alert('Utilisateur mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      setError('Erreur lors de la mise à jour de l\'utilisateur.');
    }
  };

  return (
    <div className=" flex min-h-screen bg-gradient-animation bg-size-200 animate-gradientAnimation">
    <div className="max-w-8xl mx-auto mt-11 p-9 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h2>
      
      <table className="min-w-full bg-white border border-gray-500">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Rôle</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
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
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Modifier l'utilisateur</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Nom:</label>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="text"
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
    </div>
  );
};

export default UserManagement;
