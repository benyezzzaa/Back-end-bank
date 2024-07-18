// src/components/CheckClientForm.js
import React, { useState } from 'react';
import axios from '../axiosConfig';

const CheckClientForm = () => {
    const [cin, setCin] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/prospects/client-info');
            setMessage(response.data.message);
        } catch (error) {
            console.error('Erreur lors de la vérification du client :', error);
            setMessage('Erreur lors de la vérification du client.');
        }
    };

    return (
        <div>
            <h2>Vérifier un Client par CIN</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>CIN:</label>
                    <input
                        type="text"
                        value={cin}
                        onChange={(e) => setCin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Vérifier</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CheckClientForm;
