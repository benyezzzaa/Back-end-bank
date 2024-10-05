import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Icône admin
import { Link,useNavigate } from 'react-router-dom'; // Pour la navigation


const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Suppression du token d'authentification
    localStorage.removeItem('token');
    // Redirection vers la page de login
    navigate('/login');
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Navbar verticale */}
      <nav className="w-64 bg-gray-900 p-4">
        <h1 className="text-2xl font-bold mb-6 text-yellow-500"> Admin Dashboard</h1>
        <ul>
          <li className="mb-4">
            <li className="mb-4">
          <Link to="/user-management" className="block p-2 rounded hover:bg-gray-700">
              User Management
            </Link>
            </li>
            <li className="mb-4">
             <Link to="/check-client" className="block p-2 rounded hover:bg-gray-700">
            Check Client
          </Link>
          </li>
          <li className="mb-4">
          <Link to="/check-prospect" className="block p-2 rounded hover:bg-gray-700">
            Check Prospect
          </Link>
          </li>
            
          </li>
          <li className="mb-4">
            <Link to="/admin/account-management" className="block p-2 rounded hover:bg-gray-700">
              Account Management
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/transactions-Admin" className="block p-2 rounded hover:bg-gray-700">
              Transactions
            </Link>
          </li>
          
        </ul>
      </nav>

      <div className="flex-1 flex flex-col">
        {/* Navbar horizontale */}
        <header className="bg-gray-800 shadow-md flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-2xl text-yellow-500" />
            <span>Administrator</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
            <button 
             onClick={handleLogout}
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600">
              Log Out
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
          {/* Contenu principal du tableau de bord */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cartes pour les nouvelles tâches, vos tâches, tâches terminées, etc. */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">New Tasks</h3>
              <p className="text-2xl">1</p>
              <p className="text-green-500">0% Since Last Month</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Your Tasks</h3>
              <p className="text-2xl">70</p>
              <p className="text-red-500">0% Since Last Month</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Completed Tasks</h3>
              <p className="text-2xl">0</p>
              <p className="text-red-500">0% Since Last Month</p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-xl font-semibold">Statistics</h3>
            {/* Ajouter des graphiques ou d'autres éléments ici */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
