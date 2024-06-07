import profileImage from "../assets/placeholder.png";
import API_URL from "../config";
import bannerImage from "../assets/bg-connect.jpg"
import facebook from "../assets/icons/facebook-icon.svg";
import instagram from "../assets/icons/Instagram-icon.svg";
import snapchat from "../assets/icons/snapchat-icon.svg";
import youtube from "../assets/icons/youtube-icon.svg";
import tiktok from "../assets/icons/tiktok-icon.svg";
import twitter from "../assets/icons/twitter-icon.svg";
import whatsapp from "../assets/icons/whatsapp-icon.svg";
import pinterest from "../assets/icons/pinterest-icon.svg";
import linkedIn from "../assets/icons/linkedin-icon.svg";
import email from "../assets/icons/mail-icon.svg";
import behance from "../assets/icons/behance-icon.svg";
import telegram from "../assets/icons/telegram-icon.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import vCardsJS from "vcards-js"


function Profile() {
  const [userData, setUserData] = useState("");
  const { userId } = useParams();


  useEffect(() => {
    // Utilisez une requête HTTP GET pour récupérer les informations de l'utilisateur
    axios.get(`${API_URL}/api/users/${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(userData)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        // Gérer les erreurs si nécessaire
      });
  }, [userId]);

  const handleDownload = () => {
    if (userData) {
      const vcard = new vCardsJS();
      vcard.firstName = userData.nomComplet;
      vcard.email = userData.mail;
      vcard.homePhone = userData.phoneNumber;
      vcard.title = userData.titre;

      if (userData.photoProfilUrl) {
        vcard.photo.attachFromUrl(userData.photoUrl, 'JPEG'); // Remplacez 'JPEG' par le format de votre image si nécessaire
    }
  
      // Convertir le vCard en chaîne de caractères
      const vcardString = vcard.getFormattedString();
  
      // Créer un objet Blob à partir de la chaîne de caractères
      const blob = new Blob([vcardString], { type: 'text/vcard' });
  
      // Créer un objet URL à partir du Blob
      const url = URL.createObjectURL(blob);
  
      // Créer un élément d'ancrage pour le téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.download = `${userData.nomComplet}.vcf`;
      link.click();
  
      // Libérer l'URL de l'objet Blob après le téléchargement
      URL.revokeObjectURL(url);
    }
  };
  
  


  return (
    <div>

      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
        {userData && (userData.banniereURL !== '' ? (
  <img className="object-cover object-top w-full" src={userData.banniereURL} alt="Bannière" />
) : (
  bannerImage && (
    <img className="object-cover object-top w-full" src={bannerImage} alt="Bannière" />
  )
))}       </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        {userData && (userData.photoProfilURL !== '' ? (
  <img className="object-cover object-top w-full" src={userData.photoProfilURL} alt="Bannière" />
) : (
  bannerImage && (
    <img className="object-cover object-top w-full" src={profileImage} alt="Bannière" />
  )
))}
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{userData.nomComplet}</h2>
          <p className="text-gray-500">{userData.titre}</p>
        </div>

        <div className="">
          <div className="py-4 mt-2 ml-4 text-gray-700 grid grid-cols-3 gap-2">
          {userData.facebook && (
    <div className="items-center">
      <a href={userData.facebook}>
        <button
          type="button"
          className="text-white bg-blue-700 to-indigo-700 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
        >
          <img src={facebook} className="h-8 w-8" alt=""/>
        </button>
      </a>
    </div>
  )}
             {userData.instagram && (
    <div className="items-center">
      <a href={userData.instagram}>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-pink-600 to-orange-500 hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30  mb-2"
        >
          <img src={instagram} className="h-8 w-8" alt="" />
        </button>
      </a>
    </div>
  )}
            {userData.snapchat && (
    <div className="items-center">
      <a href={userData.snapchat}>
        <button
          type="button"
          className="text-white bg-yellow-400 to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
        >
          <img src={snapchat} className="h-8 w-8" alt="" />
        </button>
      </a>
    </div>
  )}
  {userData.youtube && (
            <div className="items-center">
            <a href={userData.youtube}>
              <button
                type="button"
                className="text-white bg-red-600 to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={youtube} className="h-8 w-8" alt="" />
              </button>
             </a>
            </div>
            )}
          {userData.tiktok && (
            <div className="items-center">
            <a href={userData.tiktok}>
              <button
                type="button"
                className="text-white bg-black to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={tiktok} className="h-8 w-8" alt="" />
              </button>
             </a>
            </div>
            )}
            {userData.twitter && (
            <div className="items-center">
            <a href={userData.twitter}>
              <button
                type="button"
                className="text-white bg-black to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={twitter} className="h-8 w-8" alt="" />
              </button>
             </a>
            </div>  
            )}
          {userData.whatsapp && (
            <div className="items-center">
            <a href={userData.whatsapp}>
              <button
                type="button"
                className="text-white bg-green-600 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={whatsapp} className="h-8 w-8" alt="" />
              </button>
              </a>
            </div>
          )}
          {userData.pinterest && (
            <div className="items-center">
            <a href={userData.pinterest}>
              <button
                type="button"
                className="text-white bg-red-600 to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={pinterest} className="h-8 w-8" alt="" />
              </button>
             </a>
            </div>
            )}
            {userData.linkedin && (
            <div className="items-center">
            <a href={userData.linkedin}>
              <button
                type="button"
                className="text-white bg-blue-800 to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={linkedIn} className="h-8 w-8" alt="" />
              </button>
             </a>
            </div>
            )}
            {userData.mail && (
            <div className="items-center">
            <a href={`mailto:${userData.mail}`}>
              <button
                type="button"
                className="text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30  mb-2"
              >
                <img src={email} className="h-8 w-8" alt="" />
              </button>
              </a>
            </div>
            )}
            {userData.behance && (
            <div className="items-center">
            <a href={userData.behance}>
              <button
                type="button"
                className="text-white bg-blue-600 to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={behance} className="h-8 w-8" alt="" />
              </button>
              </a> 
            </div>
            )}
            {userData.telegram && (
            <div className="items-center">
              <a href="">
              <button
                type="button"
                className="text-white bg-cyan-600 to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={telegram} className="h-8 w-8" alt="" />
              </button>
              </a>
            </div> 
            )} 
          </div>
        </div>
      </div>
      <div className="p-4 border-t mx-8 mt-2">
        <button onClick={handleDownload} className="block mx-auto rounded-xl bg-blue-700 hover:shadow-lg font-semibold shadow-lg shadow-gray-600 text-white px-6 py-2">
          Enregistrer le contact 🔗
        </button>
      </div>
      <div className="mx-4 mb-4 mt-4 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-xl text-center font-bold  text-gray-500 dark:text-gray-400">
          Services
        </h5>
        <ul role="list" className="space-y-5 my-7">
        {userData.service1 && (
          <li className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 text-green-600 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            {userData.service1}
            </span>
          </li>
        )}
        {userData.service2 && (
          <li className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 text-green-600 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            {userData.service2}
            </span>
          </li>
          )}
          {userData.service3 && (
          <li className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 text-green-600 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            {userData.service3}
            </span>
          </li>
          )}
          {userData.service4 && (
          <li className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 text-green-600 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            {userData.service4}
            </span>
          </li>
          )}
        </ul>
      </div>
      <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="text-center mb-2">
        {" "}
        <span className="block text-sm  text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://connect.io/" className="hover:underline font-bold">
            CONNECT™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </div>
  );
}

export default Profile;
