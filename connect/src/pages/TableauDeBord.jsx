import React from 'react';
import logo from '../assets/gray-logo-CONNECT.svg';
import profilIcon from '../assets/profil-icon.svg';
import avatar1 from '../assets/Avatar1.png';
import platinium from '../assets/platinium-icon.svg';
import or from '../assets/or-icon.svg'; 
import argent from '../assets/argent-icon.svg';
import bronze from '../assets/bronze-icon.svg';
import oeil from '../assets/oeil.svg';
import point from '../assets/point.svg';
import handsCard from '../assets/handscard.png';
import profil from '../assets/profil.svg';

import API_URL from "../config"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
  import 'react-toastify/dist/ReactToastify.css';
  import placeholder from "../assets/placeholder.png";
  import {jwtDecode} from "jwt-decode";
  import ProtectedRoute from "../components/ProtectedRoutes";
  import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/Footer";
import StatisticsComponent from '../components/StatisticsComponent';

function TableauDeBord() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [publicProfileUrl, setPublicProfileUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [isProfileActive, setIsProfileActive] = useState(true);

    useEffect(() => {
      const getUserData = () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
          logoutUser();
          return;
        }
    
        const userName = jwtDecode(token).userName; 
        
        axios.get(`${API_URL}/api/users/${userName}`)
          .then((response) => {
            const data = response.data;
            setUserData(data);
            setIsProfileActive(data.isActive && !data.isSuspended);
            setLoading(false);
            setPublicProfileUrl(`connect2card.com/profile/${data.userName}`);
    
            // Vérification des points et des modifications restantes
            if (data && data.profil && data.credit !== undefined) {
              const remainingPoints = getRemainingPoints(data.profil, data.credit || 0);
              const remainingModifications = getRemainingModifications(data.profil, data.credit || 0);
    
              if (remainingPoints === 0 || remainingModifications === 0) {
                suspendAccount(userName);  // Suspendre le compte si les critères sont remplis
              }
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des informations utilisateur:', error);
            setLoading(false);
            toast.error('Erreur lors de la récupération des informations utilisateur');
            logoutUser();
          });
      };
    
      getUserData();
    }, []);
    


      const getProfileIcon = (profil) => {
        const icons = {
            bronze: bronze,
            platinium: platinium,
            or: or,
            argent: argent
        };
        return icons[profil] || bronze;
    };
    
    const handleQRDownload = () => {
      if (!userData || userData.isSuspended) {
        toast.error("Téléchargement non autorisé pour les comptes suspendus");
        return;
      }
      // Vérification si userData et userData.qrCode existent
      if (userData && userData.qrCode) {
        // Création d'un élément <a> temporaire
        const link = document.createElement('a');
        link.href = userData.qrCode;
        link.download = `qr-code-${userData.userName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error("QR Code non disponible pour le téléchargement");
      }
    };

    const getProfilePoints = (profil) => {
      const pointsMap = {
          bronze: 300,
          argent: 400,
          or: 600,
          platinium: 1000
      };
      return pointsMap[profil] || 300; // Par défaut, retourne 300 points
  };

  const getMaxModifications = (profil) => {
    const modificationsMap = {
        bronze: 30,
        argent: 40,
        or: 60,
        platinium: 100
    };
    return modificationsMap[profil] || 30;
};

const getRemainingModifications = (profil, credit) => {
  const maxModifications = getMaxModifications(profil);
  const usedModifications = 100 - credit; // Calculé à partir du crédit restant
  return Math.max(0, maxModifications - usedModifications);
};

const getRemainingPoints = (profil, credit) => {
  const totalPoints = getProfilePoints(profil);
  const maxModifications = getMaxModifications(profil);
  const usedModifications = 100 - credit; // Calculé à partir du crédit restant
  const pointsPerModification = totalPoints / maxModifications;
  return Math.max(0, Math.round(totalPoints - (usedModifications * pointsPerModification)));
};

    const getProfilColor = (profil) => {
        const colors = {
            bronze: 'bg-gradient-to-r from-[#F9BC82] to-[#A87B4C]',
            platinium: 'bg-gradient-to-r from-[#636F7A] to-[#8CA2BA]',
            or: 'bg-gradient-to-r from-[#FBAB2E] to-[#F6ECBC]',
            argent: 'bg-gradient-to-r from-gray-500 to-gray-400'
        };
        return colors[profil] || 'bg-gradient-to-r from-[#F9BC82] to-[#A87B4C]';
    }
      
    const getCardCount = (profil) => {
        const cardCounts = {
            bronze: 1,
            argent: 5,
            or: 15,
            platinium: 30
        };
        return cardCounts[profil] || 1;
    };

    const getPoints = (vCardDownloadCount) => {
        return vCardDownloadCount * 1; // 2 vCardDownloadCount = 1 point, donc 1 vCardDownloadCount = 0.5 point
    };

    const getStrokeDashoffset = (vCardDownloadCount) => {
        const totalPoints = 1000;
        const currentPoints = getPoints(vCardDownloadCount);
        return 100 - (currentPoints / totalPoints * 100);
    };

      const handleCopy = () => {
        if (!userData || userData.isSuspended) {
          toast.error("Copie non autorisé pour les comptes suspendus");
          return;
        }
        const textToCopy = publicProfileUrl;
        navigator.clipboard.writeText(textToCopy).then(() => {
          toast.success("Lien copié dans le presse papier");
        }).catch(err => {
          console.error('Échec de la copie du texte : ', err);
          toast.error("Erreur lors de la copie du lien");
        });
      };

      const logoutUser = () => {
        localStorage.removeItem('token');
        setTimeout(() => {
          navigate("/login"); // Naviguer vers la page d'historique
        }, 1000);
        toast.error("Votre session a expiré. Veuillez vous reconnecter.");
      };
    
      const handleProfil = () => {
        if (userData?.isSuspended) {
          toast.error("Vous ne pouvez pas visiter votre profil lorsque le compte est suspendu.");
          return;
        }
        if (userData && userData._id) {
          const consulterProfil = "/profile/" + userData.userName;
          navigate(consulterProfil);
        } else {
          console.error("L'utilisateur n'a pas d'ID valide.");
          toast.error("Erreur lors de la redirection vers le profil utilisateur.");
        }
      };

      const toggleProfileStatus = async () => {
        if (userData?.isSuspended) {
          toast.error("Vous ne pouvez pas modifier l'état du profil lorsque le compte est suspendu.");
          return;
        }
        try {
          const response = await axios.patch(`${API_URL}/api/users/${userData.userName}/toggle-status`);
          setIsProfileActive(response.data.isActive);
          setUserData(prevData => ({ ...prevData, isActive: response.data.isActive }));
          toast.success(response.data.message);
        } catch (error) {
          console.error('Erreur lors du basculement du statut du profil:', error);
          toast.error("Erreur lors de la modification du statut du profil");
        }
      };

      const handleEditProfile = () => {
        if (userData?.isSuspended) {
          toast.error("Vous ne pouvez pas modifier vos informations lorsque le compte est suspendu.");
          return;
        }
        navigate('/tableau-de-bord/edit');
      };

      if (loading) {
        return <Loading />;
      }
  return (
    
    <div className='dark:bg-gradient-to-r from-[#41B9C5] to-white bg-white min-h-screen'> 
    {userData && userData.isSuspended && (
        <div className="bg-red-100 border mx-8 text-center mt-5 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Compte suspendu!</strong>
          <span className="block sm:inline"> Votre compte a été suspendu. Certaines fonctionnalités sont restreintes.</span>
        </div>
      )}
      <button 
        onClick={toggleProfileStatus}
        disabled={userData?.isSuspended}
        className={`... ${userData?.isSuspended ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
      </button>
    <ProtectedRoute>
      <nav className="flex justify-between items-center p-4 font-sans font-bold">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 ml-6" />
        </div>
        <div className="hidden md:flex items-center">
        <Link to="/"> <button  className="mx-2 px-4 py-2 bg-gradient-to-r from-[#FFDE17] to-[#39BCC5] text-white rounded-full">Accueil</button></Link>
          <button onClick={logoutUser} className="mx-2 px-4 py-2 bg-gradient-to-r from-[#39BCC5] to-[#8084C0] text-white rounded-full">Déconnexion</button>
          <div className="ml-4">
          {userData && (userData.photoProfilURL !== '' ? (
  <img className="h-10 w-10 rounded-full" src={userData.photoProfilURL} alt="Profil" />
) : (
  profilIcon && (
    <img src={profilIcon} alt="Profile" className="h-10 w-10 rounded-full" />
  )
))}
          </div>
        </div>
        <div className="flex md:hidden items-center">
        {userData && (userData.photoProfilURL !== '' ? (
  <img className="h-10 w-10 rounded-full" src={userData.photoProfilURL} alt="Profil" />
) : (
  profilIcon && (
    <img src={profilIcon} alt="Profile" className="h-10 w-10 rounded-full" />
  )
))}
        </div>
      </nav>
      <ToastContainer/>
      <section className="flex flex-col items-start ml-8 mt-10">
        <div className="transform -rotate-3 bg-[#DEBE6F] text-white text-2xl font-sans font-bold shadow-md p-4">
          Hey, {userData ? userData.userName : "Non connecté"}
        </div>
        <div className="mt-4 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="text-2xl font-bold text-gray-600 ml-4 font-montserrat">
            Mon tableau de bord ...
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <button 
            onClick={toggleProfileStatus}
            className={`flex items-center px-4 py-2 ${
              isProfileActive 
                ? 'bg-gradient-to-r from-green-400 to-green-600' 
                : 'bg-gradient-to-r from-red-400 to-red-600'
            } text-white rounded-full`}
          >
            {isProfileActive ? 'Profil activé' : 'Profil désactivé'}
            <div className={`ml-2 w-4 h-4 rounded-full ${isProfileActive ? 'bg-green-300' : 'bg-red-300'}`}></div>
          </button>

            <button type="button" onClick={handleEditProfile} className="px-4 py-2 bg-gray-500 text-white rounded-full">
              Modifier mes infos
            </button>
          </div>
        </div>
      </section>
      {/* Grille du dashboard */}
      <section className="mt-10 mx-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Niveau + Perso */}
          <div className={`relative shadow-md rounded-3xl p-4 flex items-start ${getProfilColor(userData ? userData.profil : "bronze")}`}>
                    <img src={avatar1} alt="Avatar" className="absolute top-[-40px] w-20" />
                    <div className="ml-28 flex flex-col justify-center">
                        <h3 className="text-base text-white font-bold mb-2">Niveau</h3>
                        <div className="flex items-center space-x-2">
                            <img src={userData ? getProfileIcon(userData.profil) : bronze} className='w-6' alt="bronze" />
                            <p className='text-gray-300 font-sans font-bold'>{ userData ? userData.profil.toUpperCase() : "BRONZE"}</p>
                        </div>
                        <span className='text-xs ml-8 text-white'>Profil</span>
                        <p className='text-white font-sans font-light text-xs'>Compteur</p>
                        <p className='text-white font-sans font-semibold text-xs'>
                            {userData ? getProfilePoints(userData.profil) : 300} <br /> POINTS
                        </p>
                        <button type="button" className="py-1 mt-2 px-2.5 me-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">UPGRADE</button>
                    </div>
                </div>
          {/* Visites sur le profil */}
          <div className="bg-gradient-to-r from-[#39BCC5] to-[#8084C0] shadow-md rounded-3xl p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Visite sur votre profil</h3>
              <img src={oeil} alt="Eye Icon" className="w-8" />
            </div>
            <p className="text-6xl font-bold text-white mt-8 ">{ userData ? userData.visitscount : "0"}</p>
          </div>
          {/* Décompte circulaire */}
          <div className="bg-gradient-to-r from-[#39BCC5] to-[#8084C0] shadow-md rounded-3xl p-4 flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full mb-4">
                        <h3 className="text-lg font-bold text-white">Points Restant</h3>
                        <img src={point} alt="Eye Icon" className="w-8" />
                    </div>
                    
                    <div className="relative flex justify-center items-center h-28 w-28">
                        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-300 dark:text-neutral-700" strokeWidth="2"></circle>
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-white dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - (getRemainingPoints(userData?.profil, userData?.credit || 0) / getProfilePoints(userData?.profil) * 100)} strokeLinecap="round"></circle>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <span className="text-center text-xs font-bold text-white dark:text-white">
                                {userData ? getRemainingPoints(userData.profil, userData.credit || 0) : 0}
                            </span>
                        </div>
                    </div>
                </div>

{/* Décompte + image */}
<div className="relative bg-gradient-to-r from-[#39BCC5] to-[#8084C0] shadow-md rounded-3xl p-4 flex flex-col justify-between">
  <div className="flex justify-between items-center w-full mb-4">
    <h3 className="text-lg font-bold text-white">Mes cartes</h3>
    <img src={handsCard} alt="Hands Card" 
         className="absolute md:mt-3 right-[-20px] sm:right-[-30px] md:right-[-45px] top-[-10px] sm:top-[-35px] md:top-[-48px] w-28 sm:w-40 md:w-52" />
  </div>
  <div className="flex justify-center items-center h-full">
    <span className="text-4xl font-bold text-white">{userData ? getCardCount(userData.profil) : 1}</span>
  </div>
</div>
          {/* Affichage modifications */}
          <div className="bg-gradient-to-r from-[#39BCC5] to-[#8084C0] shadow-md rounded-3xl p-4 flex flex-col justify-between">
                    <h3 className="text-lg font-bold text-white mb-4">Modifications d'infos</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col mt-3 items-start">
                            <span className="text-3xl font-bold text-white">
                                {userData ? `${getRemainingModifications(userData.profil, userData.credit || 0)}/${getMaxModifications(userData.profil)}` : "0/30"}
                            </span>
                            <span className="text-sm text-white">Restante(s)</span>
                        </div>
                         
                            <button type="button" onClick={handleEditProfile} className="py-1 mt-2 px-1.5 me-2 ml-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Éditer mon profil
                            </button>
                     
                    </div>
                </div>
          {/* Décompte téléchargements */}
          <div className="bg-gradient-to-r from-[#39BCC5] to-[#8084C0] shadow-md rounded-3xl p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Nombre de Téléchargements</h3>
              <img src={profil} alt="Eye Icon" className="w-8" />
            </div>
            <p className="text-6xl font-bold text-white mt-8 ">{userData ? userData.vcardDownloadsCount : "0"}</p>
          </div>

          {/* Graph */}                   
<StatisticsComponent userName={userData.userName} />

{/* Qr + info lien publique */}
<div className="bg-gradient-to-r from-[#39BCC5] to-[#8084C0] shadow-md rounded-3xl p-4 flex flex-col relative">
  {/* Conteneur pour le texte et le bouton "Modifier" */}
  <div className="flex justify-between items-start mb-4">
    {/* Texte en haut à gauche */}
    <h3 className="text-base font-bold text-white">Lien publique</h3>
    
    
    {/* Bouton en haut à droite */}
    <button 
  type="button" 
  onClick={handleCopy} 
  className="flex items-center py-1 px-2 text-sm font-bold text-white bg-gray-700 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
>
  Copier
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    className="ml-1 w-6 h-6"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" 
    />
  </svg>
</button>

  </div>

  <div className="flex justify-between items-end mt-auto">
        <div className="relative group">
          <div className="bg-white p-1 rounded-lg shadow-lg transition-all duration-300 transform group-hover:scale-105">
            <img 
              src={userData ? userData.qrCode : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUQAAAFNCAMAAABPO+Y8AAAACXBIWXMAABFgAAARYAFbISxkAAAAS1BMVEUAAAAAAAAAAQADBAQHCAgMDQ0QEBAeHh4nJyczMzNISEhbWlpmZmZoaGd9fX6MjIyOj4+Qj4+YmJigoKCmpqbCwsLMy8v09PT///+mYI2UAAAAAXRSTlMAQObYZgAAA+lJREFUeNrt28lW20AQBVCUgOMQMthM+v8vzZaFOU2VqpsWvm/J0dRXzaKq5JtVtubmhgFEiBAFIkSIEAUiRIgQBSJEiBAFIkSIEAUiRIgQBeLVIy5vkvvrjIhLZY6fh/i7dCELRIgQIUKECBEiRIgQZ0O8y+X2IuKS5Uqu7w3i9+RC7r4VIL7mqsnn7Yih/4wm4t9sXfwTIkSIECFChAgRIkSIEK8F8Xho5FyKWNAneAfx3FrIsR/iofX0pxZiwTS6fWwb8dRayAEiRIgQIUKECBEiRIhXiBiq2dIVNcQkYqgBAREiRIgQIUKECBEiRIh9ECtGpl+nARHpL2RPgwgRIkSIECFChAgR4vUgnk+NvGTLvlBhGKgc30F8aS3kDHFqxEimRgwFIkSIECFChAgRIkSIEyM+PqXyJzsy7YX46ymZHwWI21PxK9PQNPoiYu3bgQgRIkSIECFChAgR4ici3lfmoeDlJBH/lS7kPoY4IskXn5z59w1EiBAhQoQIESJEiBAHIhZXZyOu1mSuqCLnRqzsRUCECBEiRIgQIUKECBEixJ3UzgX3qED8gGcEcURDJ9Cv2TJu3/pwECFChAgRIkSIECFCnBgxVC0V117bvxUuKMUrhvcjENdaz+07P9aAgAgRIkSIECFChAgRYn/EimHeHGVfspTtiLjm7r1kD95+4a6dFIgQIUKECBEiRIgQIQ5E/MzPOWuLweI1dUMMndc+GCJEiBAhQoQIESJEiBA3I9bOLa8JMbnnBqfAJboSiBAhQoQIESJEiBAh7gyxfVrp1dJF6/aOwQcQC972HIjpvQoRIkSIECFChAgRIsRdIGYLp9ox4vb6bhrEwP4sLmtLOgaBHgZEiBAhQoQIESJEiBD3jLh8mUyCOKQLMAAx1o2BCBEiRIgQIUKECBEiRIidxqAzI3ZLqNmSPXZZK68MESJEiBAhQoQIESLE6RDvK/NQgFg7r05XnCHE0pL0CBEiRIgQIUKECBEiRIidEB+fUvmzF8SCeWAb8TXXani+iJjuVvRrQETOWyFChAgRIkSIECFChDgv4vnUyEsLMVSdDf8gdAjiofUUp1LEio4BRIgQIUKECBEiRIgQIeYQAytZhqR9v10jpj2Tt4YIESJEiBAhQoQIESLEKSq5kup6hgZEdqNlp9ihNghEiBAhQoQIESJEiBD3gXg8NHIuGJlOnQLESCoQa+fOBU2MFSJEiBAhQoQIESJEiBC/HuJdLrfdEAvq3uG18/YUf7PdVq5o7kCECBEiRIgQIUKECHFexF6BKCtEiBAhCkSIECEKRIgQIQpEiBAhCkSIEAUiRIgQ5QKiyBT5D9IeI+Y+PH2XAAAAAElFTkSuQmCC"} 
              alt="QR Code" 
              className="w-24 h-24 object-cover"
            />
          </div>
          <button
            onClick={handleQRDownload}
            className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>

        <button type="button" onClick={handleProfil} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300">
          Visiter le profil
        </button>
      </div>
    </div>



        </div>
      </section>
      <footer className="mt-6 mx-3 text-white py-4">
  <div className="container mx-auto">
    <div className="flex flex-wrap justify-center items-center">
      {/* Liste des éléments du footer */}
      <ul className="flex flex-wrap text-black font-medium justify-center text-sm md:justify-center">
        <li className="mb-2 md:mb-0 md:mx-4"><a href="/cookies" className="hover:underline">Cookies</a></li>
        <li className="mb-2 md:mb-0 md:mx-4"><a href="/conditions-generales" className="hover:underline">Conditions Générales</a></li>
        <li className="mb-2 md:mb-0 md:mx-4"><a href="/confidentialites" className="hover:underline">Confidentialité</a></li>
        <li className="mb-2 md:mb-0 md:mx-4"><a href="/mentions-legales" className="hover:underline">Mentions Légales</a></li>
        <li className="mb-2 md:mb-0 md:mx-4"><a href="/faq" className="hover:underline">F.A.Q</a></li>
        <li className="mb-2 md:mb-0 md:mx-4"><a href="/blog" className="hover:underline">Blog</a></li>
        <li className="mb-2 md:mb-0 md:mx-4"><a href="/profile/connect" className="hover:underline">Contacts</a></li>
      </ul>
    </div>
  </div>
</footer>

</ProtectedRoute>
    </div>
    
  );
}

export default TableauDeBord;
