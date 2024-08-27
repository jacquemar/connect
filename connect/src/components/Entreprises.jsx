import React, { useState } from 'react';
import nosOffresEntreprises from '../assets/nosOffresEntreprises.svg';
import entreprises from '../assets/entreprise.svg';
import API_URL from '../config';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Entreprises() {
  const [formData, setFormData] = useState({
    isCommerçant: false,
    wantWebApp: false,
    wantOpenTables: false,
    wantLoyaltySystem: false,
    wantAdminDashboard: false,
    wantClientDatabase: false,
    wantModifyArticles: false,
    otherPrecisions: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, type } = event.target;
    const value = type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const initialFormState = { ...formData }; // Copie de l'état initial du formulaire

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/entreprise-requests`, formData);
      if (response.data.success) {
        toast.success("Votre demande de devis a bien été enregistrée!");
        
        // Réinitialiser le formulaire
        setFormData(initialFormState);
        
        // Rediriger l'utilisateur après un court délai
        setTimeout(() => {
          navigate('/login'); // Assurez-vous que '/login' est le bon chemin vers votre page de connexion
        }, 2000); // Délai de 2 secondes avant la redirection
      } else {
        toast.error("Une erreur est survenue lors de l'enregistrement de votre demande de devis.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande de devis:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md max-w-md mx-auto'>
      <div className="flex flex-col items-center w-full">
        <img src={nosOffresEntreprises} alt="Nos offres NFC Entreprises" className="w-52 mb-6" />
        <img src={entreprises} className='w-20 mb-8' alt="Icône entreprises" />
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {Object.entries(formData).map(([key, value]) => {
            if (key !== 'otherPrecisions') {
              return (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    name={key}
                    checked={value}
                    onChange={handleInputChange}
                    className="mr-3 h-5 w-5 rounded-md border-gray-300 text-gray-600 focus:ring-gray-500"
                  />
                  <label>{getLabel(key)}</label>
                </div>
              );
            }
            return null;
          })}

          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium">Autre précisions (Exemple : nombre de table)</label>
            <textarea
              name="otherPrecisions"
              value={formData.otherPrecisions}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300 mt-6">
            Demander un devis
          </button>
        </form>
      </div>
    </div>
  );
}

function getLabel(key) {
  const labels = {
    isCommerçant: "Je suis un commerçant",
    wantWebApp: "Je veux un service de menu (web app)",
    wantOpenTables: "Je veux pouvoir voir les tables ouvertes",
    wantLoyaltySystem: "Je veux un système de fidélisation",
    wantAdminDashboard: "Je veux avoir un dashboard admin",
    wantClientDatabase: "Je veux avoir une base de données clients",
    wantModifyArticles: "Je veux pouvoir entrer et modifier mes articles"
  };
  return labels[key] || key;
}

export default Entreprises;