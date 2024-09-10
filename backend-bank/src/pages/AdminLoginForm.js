import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Modal component for error messages
const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative z-10">
        <h3 className="text-lg font-semibold mb-4">Error</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="absolute bottom-4 right-4 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/login', { username, password });

      if (response.data.success) {
        // Stocker le token dans le localStorage
        localStorage.setItem('token', response.data.token);
        navigate('/admin-dashboard'); // Rediriger vers la page AdminDashboard
      } else {
        setError(response.data.message);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setError(error.message);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-8 relative">
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <img src="https://i.pinimg.com/564x/56/3c/37/563c372a5672f48dd626d06948aca2fb.jpg" alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">My Bank</span>
        </div>
        <div className="w-full max-w-md p-8 border border-black rounded-lg bg-transparent relative">
          <h2 className="text-3xl font-bold text-center bg-gray-100 px-4 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="mb-4">
              <input
                id="username"
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full text-gray-800 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 text-center"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-gray-400 hover:underline">Forgot Username or Password?</a>
          </div>
          <div className="mt-2 text-center">
            <a href="#" className="text-gray-400 hover:underline">Create new account</a>
          </div>
        </div>
      </div>
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://i.pinimg.com/564x/56/3c/37/563c372a5672f48dd626d06948aca2fb.jpg')`,
        }}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={error} />
    </div>
  );
};

export default AdminLoginForm;
