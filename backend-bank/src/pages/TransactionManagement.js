import React, { useState } from 'react';

const AddTransactionForm = () => {
  const [clientCin, setClientCin] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    const transactionData = {
      client_cin: clientCin,
      amount: parseFloat(amount),  // Assure-toi que c'est bien un nombre
      transaction_type: transactionType,
      description,
    };

    console.log('Données envoyées:', transactionData); // Log les données envoyées

    try {
      const response = await fetch('/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      console.error('Erreur lors de l\'ajout de la transaction:', error);
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
