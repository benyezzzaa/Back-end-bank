import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Composant Modal pour afficher les messages d'erreur
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

const AddTransactionForm = () => {
  const [clientCin, setClientCin] = useState('');
  const [recipientCin, setRecipientCin] = useState('');  // Nouveau champ pour recipient CIN
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleAddTransaction = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Erreur : Token manquant. Veuillez vous reconnecter.');
      setIsModalOpen(true);
      return;
    }
    console.log('recipient_cin:', recipientCin); 
    const transactionData = {
      client_cin: clientCin,
      recipient_cin: recipientCin, // Inclure recipient_cin dans les données
      amount: parseFloat(amount),
      transaction_type: transactionType,
      description,
    };
    console.log('Transaction data before sending:', transactionData);
    try {
      const response = await axios.post('/transactions/add', transactionData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        setMessage('Transaction ajoutée avec succès.');
        setIsModalOpen(true);
        // Redirection ou autre logique après succès
      } else {
        setMessage(response.data.error || 'Erreur inconnue.');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la transaction:', error);
      setMessage(error.response?.data?.error || 'Erreur lors de l\'ajout de la transaction.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Ajouter une Transaction</h2>
      <form onSubmit={handleAddTransaction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">CIN Client</label>
          <input
            type="text"
            value={clientCin}
            onChange={(e) => setClientCin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">CIN Destinataire</label>  {/* Nouveau champ */}
          <input
            type="text"
            value={recipientCin}
            onChange={(e) => setRecipientCin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Montant</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Type de Transaction</label>
          <input
            type="text"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Ajouter la Transaction
        </button>
      </form>

      {/* Modale pour les messages */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {message}
      </Modal>
    </div>
  );
};

export default AddTransactionForm;
