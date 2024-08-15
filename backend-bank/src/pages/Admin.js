import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Pour la navigation


const Admin = () => {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    // Suppression du token d'authentification
    localStorage.removeItem('token');
    // Redirection vers la page de login
    navigate('/login-client');
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <header className="w-full bg-gray-900 p-4 flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">Client Dashboard</h1>
        <nav className="flex space-x-4">
        
          <Link to="/account-management" className="text-white hover:text-yellow-500">
            Account Management
          </Link>
          <Link to="/transaction-management" className="text-white hover:text-yellow-500">
            Transaction Management
          </Link>
          
            <Link to="/settings" className="text-white hover:text-yellow-500">
              Settings
            </Link>
            <button 
             onClick={handleLogout}
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600">
              Log Out
            </button>
          
        </nav>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:space-x-8 p-8">
        <div className="text-center lg:text-left lg:w-1/2">
          <h2 className="text-4xl text-white font-bold mb-4">
            Fast And Simple Digital Payment Solution
          </h2>
          <p className="text-gray-300 mb-6">
            Manage your financial transactions easily with our simple-to-use system. Secure and efficient digital payment solutions.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/get-it-now"
              className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-600"
            >
              Get It Now
            </Link>
            <Link
              to="/download-app"
              className="bg-transparent border border-yellow-500 text-yellow-500 font-bold py-3 px-6 rounded-full hover:bg-yellow-500 hover:text-black"
            >
              Download App
            </Link>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
          <img
            src="https://i.pinimg.com/564x/64/af/8d/64af8df64640f1bb6d51761aa46d8045.jpg"
            alt="Payment Solution"
            className="w-full max-w-md h-auto object-contain"
          />
        </div>
      </main>
    </div>
  );
};

export default Admin;