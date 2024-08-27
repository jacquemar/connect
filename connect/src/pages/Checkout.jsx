import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
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
import { useNavigate } from "react-router-dom";
import Navigation from '../components/Navigation';


function Checkout() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
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

  const checkEmail = async (email) => {
    try {
      const response = await axios.get(`${API_URL}/check-email`, { params: { email } });
      return response.data.exists;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      toast.error("Erreur lors de la vérification de l'email. Veuillez réessayer.");
      return false;
    }
  };
  
  const checkUsername = async (userName) => {
    try {
      const response = await axios.get(`${API_URL}/check-username`, { params: { userName } });
      return response.data.exists;
    } catch (error) {
      console.error("Erreur lors de la vérification du nom d'utilisateur:", error);
      toast.error("Erreur lors de la vérification du nom d'utilisateur. Veuillez réessayer.");
      return false;
    }
  };

  const FormTitles = ["Choisissez votre profil", "Sélection de l'offre", "Informations", "Méthode de paiement"];

  const PageDisplay = () => {
    switch(page) {
      case 0:
        return (
          <div className="w-full max-w-md space-y-4">
            <div className='flex flex-col items-start mt-6 mb-10'>
              <img src={nosOffres} alt="nos offres NFC" className='h-14' />
            </div>
            <div 
              className={`relative cursor-pointer rounded-2xl transition-all duration-300 ease-in-out ${
                formData.userType === 'particulier' ? 'transform scale-105 shadow-lg' : 'transform scale-100 shadow-md'
              }`}
              onClick={() => setFormData({...formData, userType: 'particulier'})}
            >
              <img src={bronzeZone} alt="particulier" className="w-full" />
              
              <span className="absolute inset-0 flex items-center -mt-6 justify-center text-white font-normal text-xl">
                Je suis un 
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold mt-6 text-2xl">particulier</span>
             
            </div>
            <div 
              className={`relative cursor-pointer rounded-2xl transition-all duration-300 ease-in-out ${
                formData.userType === 'entreprise' ? 'transform scale-105 shadow-lg' : 'transform scale-100 shadow-md'
              }`}
              onClick={() => setFormData({...formData, userType: 'entreprise'})}
            >
              <img src={argentZone} alt="entreprise" className="w-full" />
              <span className="absolute inset-0 flex items-center -mt-6 justify-center text-white font-normal text-xl">
                Je suis une 
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold mt-6 text-2xl">Entreprise</span>
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

  const handleNext = async () => {
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

      try {
        const [emailExists, userNameExists] = await Promise.all([
          checkEmail(email),
          checkUsername(userName)
        ]);

        if (emailExists) {
          toast.error("Cet email est déjà utilisé.");
          return;
        }

        if (userNameExists) {
          toast.error("Ce nom d'utilisateur est déjà utilisé.");
          return;
        }
      } catch (error) {
        console.error("Erreur lors de la vérification:", error);
        toast.error("Une erreur est survenue lors de la vérification. Veuillez réessayer.");
        return;
      }
    }
  
    if (page < FormTitles.length - 1) {
      setPage(page + 1);
    }
  };
  
  const isLastPage = page === FormTitles.length - 1;
  const isEntreprisePage = page === 1 && formData.userType === 'entreprise';

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer/>
      <Navigation formData={formData}/>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          {PageDisplay()}
          <div className={`mt-14 flex mb-32 ${isEntreprisePage ? 'justify-center' : 'justify-between'}`}>
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-300 font-bold text-gray-700 rounded-full disabled:opacity-50 transition-all duration-300"
            >
              Retour
            </button>
            {!isEntreprisePage && !isLastPage && (
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