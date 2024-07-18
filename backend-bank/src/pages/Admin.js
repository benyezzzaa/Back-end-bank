// src/pages/Admin.js
import React, { useState, useEffect } from 'react';

// src/pages/Admin.js
import axios from '../axiosConfig';
import CheckClientForm from './CheckClientForm';


const Admin = () => {
    const [prospects, setProspects] = useState([]);
    const [clientInfos, setClientInfos] = useState([]);

    useEffect(() => {
        // Récupérer les prospects
        axios.get('/:cin')
            .then(response => {
                setProspects(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des prospects :", error);
            });
    }, []);

    const fetchClientInfos = (cinList) => {
        axios.post('/prospect-client-info', { prospectIds: cinList })
            .then(response => {
                setClientInfos(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des informations des clients :", error);
            });
    };

    return (
        <div>
            <h1>Interface Admin</h1>
            <h2>Prospects</h2>
            < CheckClientForm/>
            <ul>
                {prospects.map(prospect => (
                    <li key={prospect.cin}>{prospect.cin}</li>
                ))}
            </ul>
            <button onClick={() => fetchClientInfos(prospects.map(p => p.cin))}>
                Récupérer les informations des clients
            </button>
            <h2>Informations des Clients</h2>
            <ul>
                {clientInfos.map(client => (
                    <li key={client.cin}>
                        {client.firstname} {client.lastname} - {client.email} - {client.address}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
