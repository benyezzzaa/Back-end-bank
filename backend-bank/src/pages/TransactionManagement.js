import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/transactions');
        setTransactions(response.data);
        setSortedTransactions(response.data); // Initialise les transactions triées avec toutes les transactions
      } catch (error) {
        console.error('Erreur lors de la récupération des transactions :', error);
        setError('Erreur lors de la récupération des transactions.');
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const applySort = () => {
      let sorted = [...transactions];
      
      if (sortOrder === 'asc') {
        sorted.sort((a, b) => a.date.localeCompare(b.date)); // Tri par date croissante
      } else {
        sorted.sort((a, b) => b.date.localeCompare(a.date)); // Tri par date décroissante
      }
      
      setSortedTransactions(sorted);
    };

    applySort();
  }, [sortOrder, transactions]);

  const handleApproveTransaction = async (transactionId) => {
    try {
      await axios.post(`/transactions/approve/${transactionId}`);
      setError('');
      alert('Transaction approuvée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'approbation de la transaction :', error);
      setError('Erreur lors de l\'approbation de la transaction.');
    }
  };

  const handleRejectTransaction = async (transactionId) => {
    try {
      await axios.post(`/transactions/reject/${transactionId}`);
      setError('');
      alert('Transaction rejetée avec succès.');
    } catch (error) {
      console.error('Erreur lors du rejet de la transaction :', error);
      setError('Erreur lors du rejet de la transaction.');
    }
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6  rounded-lg shadow-md bg-gradient-animation bg-size-200 justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gestion des Transactions</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Options de tri */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Options de Tri</h3>
        <div>
          <label className="block text-gray-700">Trier par date:</label>
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="asc">Date Croissante</option>
            <option value="desc">Date Décroissante</option>
          </select>
        </div>
      </div>

      {/* Tableau des transactions */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID de Transaction</th>
            <th className="py-2 px-4 border-b">Utilisateur</th>
            <th className="py-2 px-4 border-b">Montant</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="py-2 px-4 border-b">{transaction.id}</td>
              <td className="py-2 px-4 border-b">{transaction.userId}</td>
              <td className="py-2 px-4 border-b">{transaction.amount}</td>
              <td className="py-2 px-4 border-b">{transaction.date}</td>
              <td className="py-2 px-4 border-b">{transaction.type}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleApproveTransaction(transaction.id)}
                >
                  Approuver
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRejectTransaction(transaction.id)}
                >
                  Rejeter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionManagement;
