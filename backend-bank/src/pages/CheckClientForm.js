import React, { useState } from 'react';
import axios from 'axios';

const CheckClientForm = () => {
  const [cin, setCin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/clients/check', {
        cin,
        firstName,
        lastName,
        email,
        address,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Erreur lors de la vérification du client :', error);
      setMessage('Erreur lors de la vérification du client.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-animation bg-size-200 animate-gradientAnimation">
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-center">Vérifier un Client</h2>
      <div className="mb-4">
        <label htmlFor="cin" className="block text-gray-700">CIN:</label>
        <input
          id="cin"
          type="text"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700">Prénom:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700">Nom:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700">Adresse:</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Vérifier
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  </div>
);
};

export default CheckClientForm;
