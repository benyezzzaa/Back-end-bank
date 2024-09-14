import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountManagement = () => {
    const [client, setClient] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const token = localStorage.getItem('token'); // ou utilisez le token de session si applicable
                const response = await axios.get('clients/account-management', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setClient(response.data.client);
                setTransactions(response.data.transactions);
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchClientData();
    }, []);

    if (!client) return <p>Loading...</p>;

    return (
        <div className="account-management">
            <h1>Account Management</h1>
            <div>
                <h2>Personal Information</h2>
                <p>First Name: {client.firstname}</p>
                <p>Last Name: {client.lastname}</p>
                <p>Email: {client.email}</p>
                <p>Address: {client.adress}</p>
                <p>Password: ******</p> {/* Ne pas afficher le mot de passe en clair */}
                <p>Balance: ${client.amount}</p>
            </div>
            
            <div>
                <h2>Transaction History</h2>
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction.id}>
                            {transaction.date} - ${transaction.amount} - {transaction.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AccountManagement;
