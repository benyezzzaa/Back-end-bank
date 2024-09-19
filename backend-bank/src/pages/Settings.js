import React, { useState } from 'react';
import { FaSave, FaTrashAlt, FaEnvelope, FaPhone, FaQuestionCircle } from 'react-icons/fa';

const Settings = () => {
  // État pour gérer les données de support
  const [supportEmail, setSupportEmail] = useState('');
  const [supportPhone, setSupportPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fonction pour sauvegarder les paramètres
  const handleSave = () => {
    // Logic to save settings
    alert('Paramètres sauvegardés !');
  };

  // Fonction pour réinitialiser les paramètres
  const handleReset = () => {
    // Logic to reset settings
    alert('Paramètres réinitialisés !');
  };

  // Fonction pour gérer l'envoi du formulaire de support
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remplacez l'URL par celle de votre API de support
    const response = await fetch('/api/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message }),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setEmail('');
      setMessage('');
    } else {
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h2>

      {/* Section Informations du Profil */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations du Profil</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Votre adresse e-mail"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Votre mot de passe"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-300 ease-in-out"
            >
              <FaSave />
              <span>Enregistrer</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-300 ease-in-out"
            >
              <FaTrashAlt />
              <span>Réinitialiser</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section Support Client */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Client</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Votre Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Votre adresse e-mail"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
              Votre Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Votre message"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Envoyer
            </button>
          </div>
        </form>
        {isSubmitted && (
          <div className="mt-4 text-green-600">
            <p>Votre demande a été envoyée avec succès. Nous vous contacterons bientôt !</p>
          </div>
        )}
      </div>

      {/* Section Autres Paramètres */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Autres Paramètres</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <FaQuestionCircle className="text-yellow-500 mr-2" />
            <p className="text-gray-700">Contactez-nous pour toute question ou problème.</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-yellow-500 mr-2" />
            <p className="text-gray-700">Email : support@example.com</p>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-yellow-500 mr-2" />
            <p className="text-gray-700">Téléphone : +123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
