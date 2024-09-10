import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button className="text-red-500 float-right" onClick={onClose}>X</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

const ClientLoginForm = () => {
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/clients/login', { cin, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/client'); 
      } else {
        setError(response.data.message);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response?.data?.message || 'Error during login.');
      setIsModalOpen(true);
    }
  };
  
  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('/login', credentials);
      
      // Enregistre le token dans le localStorage
      localStorage.setItem('token', response.data.token);
  
      // Redirige vers la page de gestion de compte après le login
      navigate('/account-management'); // utilise `useNavigate` de React Router v6
    } catch (error) {
      console.error('Erreur lors du login :', error);
      setError('Échec de la connexion.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Partie gauche : Formulaire de connexion */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6">Client Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="cin"
              type="text"
              placeholder="CIN"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-gray-300 hover:bg-gray-400 text-black font-medium rounded-lg text-sm py-2.5 text-center"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-gray-600 hover:underline">Forgot Username or Password?</a>
          </div>
          <div className="mt-2 text-center">
            <a href="#" className="text-sm text-gray-600 hover:underline">Create new account</a>
          </div>
        </div>
      </div>

      {/* Partie droite : Image de fond */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://i.pinimg.com/564x/f7/c9/da/f7c9da65a1e524a8af59e8bc1fa342e9.jpg')`,
        }}
      />

      {/* Modale pour les erreurs */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {error}
      </Modal>
    </div>
  );
};

export default ClientLoginForm;
