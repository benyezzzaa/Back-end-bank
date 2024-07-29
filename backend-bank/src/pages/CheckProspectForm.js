import React, { useState } from 'react';
import axios from 'axios';

const CheckProspectForm = () => { 
  const [cin, setCin] = useState('');
  const [prospect, setProspect] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/prospects/${cin}`)
      
      setProspect(response.data[0]);
      setError('');
    } catch (error) { 
      /*console.error('Erreur lors de la vérification du prospect :', error);*/
      setError('Prospect non trouvé.');
      setProspect(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-animation bg-size-200 animate-gradientAnimation">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Vérifier un Prospect par CIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">CIN:</label>
            <input
              type="text"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Vérifier
          </button>
        </form>
        {prospect && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p><strong>Nom:</strong> {prospect.firstname} {prospect.lastname}</p>
            <p><strong>Email:</strong> {prospect.email}</p>
            <p><strong>Adresse:</strong> {prospect.address}</p>
          </div>
        )}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CheckProspectForm;
