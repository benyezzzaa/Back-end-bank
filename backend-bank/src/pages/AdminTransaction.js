import React, { useState, useEffect } from 'react';

const AdminTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/transactions/all'); // Vérifiez si ce chemin est correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Liste des Transactions</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">CIN Client</th>
            <th className="border px-4 py-2">Nom Client</th>
            <th className="border px-4 py-2">Email Client</th>
            <th className="border px-4 py-2">Montant</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">CIN Destinataire</th> {/* Nouvelle colonne */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border px-4 py-2">{transaction.client_cin}</td>
              <td className="border px-4 py-2">{transaction.name}</td>
              <td className="border px-4 py-2">{transaction.email}</td>
              <td className="border px-4 py-2">{transaction.amount}</td>
              <td className="border px-4 py-2">{transaction.transaction_type}</td>
              <td className="border px-4 py-2">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{transaction.description}</td>
              <td className="border px-4 py-2">{transaction.recipient_cin}</td> {/* Ajout du recipient_cin */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransaction;
