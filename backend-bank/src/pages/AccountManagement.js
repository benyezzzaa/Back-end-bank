import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountManagement = () => {
    const [clientData, setClientData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await axios.get('/clients/account-management', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setClientData(response.data.client);
                setTransactions(response.data.transactions);
            } catch (error) {
                if (error.response) {
                    // Gérer les erreurs en fonction du code de statut HTTP
                    if (error.response.status === 401) {
                        setError('Unauthorized: Please log in.');
                    } else if (error.response.status === 403) {
                        setError('Forbidden: Invalid token.');
                    } else {
                        setError('Error fetching client data.');
                    }
                } else {
                    setError('Network error. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchClientData();
    }, []);

    if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Account Management</h1>
                
                {clientData && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Client Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <p><span className="font-bold">CIN:</span> {clientData.cin}</p>
                            <p><span className="font-bold">First Name:</span> {clientData.firstname}</p>
                            <p><span className="font-bold">Last Name:</span> {clientData.lastname}</p>
                            <p><span className="font-bold">Email:</span> {clientData.email}</p>
                            <p><span className="font-bold">Address:</span> {clientData.adress}</p>
                        </div>
                    </div>
                )}

                <h2 className="text-xl font-semibold text-gray-700 mb-4">Transaction History</h2>
                {transactions.length > 0 ? (
                    <ul className="space-y-4">
                        {transactions.map(transaction => (
                            <li key={transaction.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <p><span className="font-semibold">Details:</span> {transaction.details}</p>
                                <p><span className="font-semibold">Amount:</span> {transaction.amount}</p>
                                {/* Affichage de la date de la transaction */}
                                <p><span className="font-semibold">Date:</span> {transaction.transaction_date}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default AccountManagement;
