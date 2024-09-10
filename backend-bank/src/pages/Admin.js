import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaCog, FaMoneyCheckAlt, FaExchangeAlt, FaArrowUp, FaHome, FaUser } from 'react-icons/fa';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login-client');
  };

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-16 bg-gray-800 h-full flex flex-col items-center space-y-6 py-4 lg:w-20">
        <Link to="/" className="text-white hover:text-yellow-300">
          <FaHome size={24} />
        </Link>
        <Link to="/account-management" className="text-white hover:text-yellow-300">
          <FaUser size={24} />
        </Link>
        <Link to="/transactions/:cin" className="text-white hover:text-yellow-300">
          <FaMoneyCheckAlt size={24} />
        </Link>
        <Link to="/settings" className="text-white hover:text-yellow-300">
          <FaCog size={24} />
        </Link>
      </aside>

      {/* Header */}
      <header className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-lg lg:p-6 lg:ml-16">
        <h1 className="text-xl text-white font-bold flex items-center space-x-2 lg:text-3xl">
          <FaUserCircle className="text-white" />
          <span>Client Dashboard</span>
        </h1>
        <nav className="flex space-x-2 lg:space-x-6">
          <Link to="/account-management" className="text-white hover:text-yellow-300 flex items-center space-x-1">
            <FaMoneyCheckAlt />
            <span className="hidden md:inline">Gestion des Comptes</span>
          </Link>
          <Link to="/transactions/:cin" className="text-white hover:text-yellow-300 flex items-center space-x-1">
            <FaExchangeAlt />
            <span className="hidden md:inline">Gestion des Transactions</span>
          </Link>
          <Link to="/settings" className="text-white hover:text-yellow-300 flex items-center space-x-1">
            <FaCog />
            <span className="hidden md:inline">Paramètres</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center bg-yellow-500 text-gray-900 px-2 py-1 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out lg:px-4 lg:py-2">
            <FaSignOutAlt />
            <span className="ml-2 hidden md:inline">Déconnexion</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 lg:flex-row lg:space-x-12 lg:p-8 lg:ml-16">
        <div className="text-center lg:text-left lg:w-1/2">
          <h2 className="text-3xl text-black font-bold mb-4 lg:text-5xl">
            Solution de Paiement Innovante et Sûre
          </h2>
          <p className="text-black text-base mb-6 lg:text-lg">
            Découvrez une nouvelle manière de gérer vos finances avec notre solution de paiement numérique. Simple, sécurisée et toujours à portée de main.
          </p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <Link
              to="/get-it-now"
              className="bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              Obtenez-le Maintenant
            </Link>
            <Link
              to="/download-app"
              className="bg-transparent border border-yellow-500 text-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 hover:text-white hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              Télécharger l'App
            </Link>
          </div>
        </div>
        <div className="mt-6 lg:mt-0 lg:w-1/2 flex justify-center items-center">
          <img
            src="https://i.pinimg.com/236x/a5/77/ae/a577ae907938d3a0df86487adc3dc62d.jpg"
            alt="Payment Solution"
            className="w-full max-w-md h-auto object-contain rounded-lg shadow-xl transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
      </main>

      {/* New Section with a Different Design */}
      <div className="py-16 bg-white">
        <div className="container mx-auto flex flex-col items-center">
          <h3 className="text-2xl font-bold text-black mb-6 lg:text-3xl">
            Découvrez notre Carte Technologique
          </h3>
          <div className="relative flex justify-center items-center">
            <img
              src="/mnt/data/webank.png"
              alt="Webank Technology Card"
              className="w-full max-w-sm object-contain lg:max-w-xl"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-lg font-semibold space-y-4">
              {/* Placeholder for any overlaid content */}
            </div>
          </div>
          <div className="mt-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Link
              to="/learn-more"
              className="bg-yellow-500 text-gray-900 py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out">
              En Savoir Plus
            </Link>
            <Link
              to="/get-your-card"
              className="bg-transparent border border-yellow-500 text-yellow-500 py-2 px-4 rounded-full hover:bg-yellow-600 hover:text-white transition duration-300 ease-in-out">
              Obtenir Ma Carte
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop} 
        className="fixed bottom-8 right-8 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none">
        <FaArrowUp />
      </button>

      {/* Footer */}
      <footer className="w-full bg-indigo-600 p-4 text-center text-white lg:ml-16">
        &copy; 2024 WeBank. Tous droits réservés. Made with ❤️ by Your Company.
      </footer>
    </div>
  );
};

export default Admin;
