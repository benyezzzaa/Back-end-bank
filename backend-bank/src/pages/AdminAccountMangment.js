import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AdminAccountManagement = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les clients depuis l'API
    const fetchClients = async () => {
        try {
            const response = await axios.get('/clients'); // Assurez-vous que l'URL est correcte
            setClients(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Erreur lors de la récupération des clients:', err);
            setError('Erreur lors de la récupération des clients.');
            setLoading(false);
        }
    };

    // Fonction pour supprimer un client
    const handleDeleteClient = async (accountNumber) => {
        try {
            await axios.delete(`/clients/${accountNumber}`); // Correction de l'URL
            setClients(clients.filter(client => client.accountNumber !== accountNumber));
        } catch (err) {
            console.error('Erreur lors de la suppression du client:', err);
            setError('Erreur lors de la suppression du client.');
        }
    };

    // Charger les clients lors du montage du composant
    useEffect(() => {
        fetchClients();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Chargement...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="admin-account-management p-6 lg:p-12">
            <h1 className="text-3xl font-bold mb-6">Gestion des Comptes Clients</h1>
            
            {/* Table des Comptes Clients */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Numéro de Compte
                            </th>
                            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Solde (€)
                            </th>
                            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Statut
                            </th>
                            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Date de Création
                            </th>
                            <th className="py-3 px-6 bg-gray-200"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.accountNumber} className="border-b">
                                <td className="py-4 px-6 whitespace-nowrap">
                                    {client.accountNumber}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    {client.solde.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    {client.isProspect === 1 ? (
                                        <span className="flex items-center text-green-600">
                                            <FaCheckCircle className="mr-2" /> Activé
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-red-600">
                                            <FaTimesCircle className="mr-2" /> Désactivé
                                        </span>
                                    )}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    {new Date(client.createdDate).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                    <button
                                        onClick={() => handleDeleteClient(client.accountNumber)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                                    >
                                        <FaTrashAlt /> Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAccountManagement;
