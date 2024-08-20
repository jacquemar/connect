import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/gray-logo-CONNECT.svg';
import panier from '../assets/panier.svg';
import nosOffres from '../assets/nosOffres.png';
import bronzeZone from '../assets/bronzeZone.svg';
import argentZone from '../assets/argentZone.svg';
import Particulier from '../components/Particuliers';
import Entreprise from '../components/Entreprises';
import Informations from '../components/Informations';
import Method from '../components/Method';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

function Checkout() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    userType: '',
    quantity: '',
    userName: '',
    nom: '',
    prenom: '',
    email: '',
    phoneNumber: '',
    password: '',
    logo: null,
    method: '',
  });

  const FormTitles = ["Choisissez votre profil", "Sélection de l'offre", "Informations", "Méthode de paiement"];

  const PageDisplay = () => {
    switch(page) {
      case 0:
        return (
          <div className="w-full max-w-md space-y-4">
            <div className='flex flex-col items-center mb-8'>
              <img src={nosOffres} alt="nos offres NFC" className='h-16' />
            </div>
            <div 
              className={`relative cursor-pointer rounded-2xl transition-all duration-300 ease-in-out ${
                formData.userType === 'particulier' ? 'transform scale-105 shadow-lg' : 'transform scale-100 shadow-md'
              }`}
              onClick={() => setFormData({...formData, userType: 'particulier'})}
            >
              <img src={bronzeZone} alt="particulier" className="w-full" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                Je suis un particulier
              </span>
            </div>
            <div 
              className={`relative cursor-pointer rounded-2xl transition-all duration-300 ease-in-out ${
                formData.userType === 'entreprise' ? 'transform scale-105 shadow-lg' : 'transform scale-100 shadow-md'
              }`}
              onClick={() => setFormData({...formData, userType: 'entreprise'})}
            >
              <img src={argentZone} alt="entreprise" className="w-full" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                Je suis une Entreprise
              </span>
            </div>
          </div>
        );
      case 1:
        return formData.userType === 'particulier' 
          ? <Particulier formData={formData} setFormData={setFormData} />
          : <Entreprise formData={formData} setFormData={setFormData} />;
      case 2:
        return <Informations formData={formData} setFormData={setFormData} />;
      case 3:
        return <Method formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (page === 0 && !formData.userType) {
      toast.error("Veuillez sélectionner un type d'utilisateur.");
      return;
    }
    if (page === 1 && !formData.quantity) {
      toast.error("Veuillez sélectionner une quantité.");
      return;
    }
    if (page === 2) {
      const { userName, nom, prenom, email, phoneNumber, password } = formData;
      if (!userName || !nom || !prenom || !email || !phoneNumber || !password) {
        toast.error("Tous les champs sont obligatoires.");
        return;
      }
    }
    
    if (page < FormTitles.length - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer/>
      <nav className="flex justify-between items-center mt-10 p-4 font-sans font-bold">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 ml-6" />
        </div>
        <div className="flex items-center">
          <div className="border-2 border-black p-3 rounded-full">
            <img src={panier} alt="Panier" className="h-8 w-8" />
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          {PageDisplay()}
          <div className="mt-14 flex mb-32 justify-between">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-300 font-bold text-gray-700 rounded-full disabled:opacity-50 transition-all duration-300"
            >
              Retour
            </button>
            {page < FormTitles.length - 1 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#8DC63F] text-white font-bold rounded-full hover:bg-[#7AB32E] transition-all duration-300"
              >
                Continuer
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;