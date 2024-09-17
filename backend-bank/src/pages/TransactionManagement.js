import React, { useState } from 'react';

const AddTransactionForm = () => {
  const [clientCin, setClientCin] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken'); // Récupère le token du localStorage

    if (!token) {
      setMessage('Erreur : Token manquant. Veuillez vous reconnecter.');
      return;
    }

    const transactionData = {
      client_cin: clientCin,
      amount: parseFloat(amount),
      transaction_type: transactionType,
      description,
    };

    try {
      const response = await fetch('/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Transaction ajoutée avec succès : ' + result.id);
      } else {
        const errorData = await response.json();
        setMessage('Erreur : ' + errorData.error);
      }
    } catch (error) {
      setMessage('Erreur lors de l\'ajout de la transaction.');
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

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default AddTransactionForm;
