import React, { useState } from 'react';

import axios from 'axios';
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button className="text-red-500 float-right" onClick={onClose}>X</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

const CheckProspectForm = () => { 
  const [cin, setCin] = useState('');
  const [prospect, setProspect] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.get(`/prospects/${cin}`);
        
        if (response.data && response.data.message) {
            // Si un message est retourné, cela signifie que le CIN n'est pas un prospect
            setError(response.data.message);
            setProspect(null); // Pas de données de prospect à afficher
        } else {
            // Si les données du prospect sont retournées
            setProspect(response.data);
            setError('Prospect trouvé');
        }
        setIsModalOpen(true);
    } catch (error) { 
        setError('Une erreur est survenue.');
        setProspect(null);
        setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-animation bg-size-200 animate-gradientAnimation">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Vérifier un Prospect par CIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">CIN:</label>
            <input
              type="text"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Vérifier
          </button>
        </form>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {prospect ? (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p><strong>Nom:</strong> {prospect.firstname} {prospect.lastname}</p>
              <p><strong>Email:</strong> {prospect.email}</p>
              <p><strong>Adresse:</strong> {prospect.address}</p>
            </div>
          ) : (
            <p className="mt-4 text-center text-red-500">{error}</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CheckProspectForm;
