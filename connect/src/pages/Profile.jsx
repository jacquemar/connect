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
import { Helmet } from "react-helmet-async";
import vCardsJS from "vcards-js";
import Loading from '../components/Loading';
import { useNavigate } from "react-router-dom";
import googleReview from "../assets/icons/google-reviews-icon.svg";
import tripadvisor from "../assets/icons/tripadvisor-icon.svg";
import web from "../assets/icons/web-icon.svg";
import Footer from "../components/Footer";
import ProfileVisitTracker from "../components/ProfileVisitTracker";
import Png404 from "../assets/Carte Erreur-01.png"

function Profile() {
  const [userData, setUserData] = useState("");
  const { userName } = useParams();
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

const renderWatermark = () => {
  if (userData && !userData.isActive) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
        <div className="flex flex-col items-center  ">
          <img src={Png404} className="w-64 mb-6" alt="Compte suspendu" />
          
          <a href="/" className="bg-[#8DC63F] hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded transition duration-300">
            Retourner à l'accueil
          </a>
        </div>
      </div>
    );
  }
  return null;
};

  useEffect(() => {
    // Récupérer les informations de l'utilisateur
    axios.get(`${API_URL}/api/users/${userName}`)
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
        navigate("/Page404");
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        setLoading(false);
      });
  }, [userName]);

  const handleDownload = async () => {
    if (userData) {
      await axios.post(`${API_URL}/api/users/${userData._id}/increment-download`);
      const vcard = new vCardsJS();
      vcard.firstName = userData.nomComplet;
      vcard.email = userData.mail;
      vcard.homePhone = userData.phoneNumber;
      vcard.title = userData.titre;
      if (userData.instagram) {
        vcard.socialUrls['Instagram'] = userData.instagram;
    }
      if (userData.twitter) {
        vcard.socialUrls['Twitter'] = userData.twitter;
    }
      if (userData.snapchat) {
        vcard.socialUrls['Snapchat'] = userData.snapchat;
    }
      if (userData.snapchat) {
        vcard.socialUrls['Snapchat'] = userData.snapchat;
    }
      if (userData.whatsapp) {
        vcard.socialUrls['Whatsapp'] = userData.whatsapp;
    }
      if (userData.tiktok) {
        vcard.socialUrls['Tiktok'] = userData.tiktok;
    }
      if (userData.youtube) {
        vcard.socialUrls['Youtube'] = userData.youtube;
    }
      if (userData.pinterest) {
        vcard.socialUrls['Pinterest'] = userData.pinterest;
    }
      if (userData.behance) {
        vcard.socialUrls['Behance'] = userData.behance;
    }
      if (userData.telegram) {
        vcard.socialUrls['Telegram'] = userData.telegram;
    }
      if (userData.linkedIn) {
        vcard.socialUrls['LinkedIn'] = userData.linkedIn;
    }
  
      // Convertir le vCard en chaîne de caractères
      let vcardString = vcard.getFormattedString();
      vcardString = vcardString.replace(/SOCIALPROFILE;CHARSET=UTF-8;/gm, "SOCIALPROFILE;");
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
  
  
  if (loading) {
    return <Loading />;
  }


  return (

    
    <div className="relative min-h-screen">
      {renderWatermark()}
      <div className={`${!userData?.isActive ? 'pointer-events-none opacity-50' : ''}`}>
            <Helmet>
                <title>Connect Profil</title>
                <meta name="description" content="C" />
                <meta name="keywords" content="Rejoignez moi sur les réseaux ou ajoutez mon contact !"/>
                <link rel="canonical" href="https://connect2card.com"/>
                <meta property="og:title" content="Connect Card" />
                <meta property="og:description" content="Carte de visite 100% digital" />
                <meta property="og:image" content="https://connect2card.com/assets/bg-connect-BrHsARTI.jpg" />
                <meta property="og:url" content="https://connect2card.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Card de visite 100% Digital" />
                <meta name="twitter:description" content="Rejoignez moi sur les réseaux ou ajoutez mon contact !" />
                <meta name="twitter:image" content="https://connect2card.com/assets/bg-connect-BrHsARTI.jpg" />
            </Helmet>
            <ProfileVisitTracker userName={userName} />
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
              <a href={userData.telegram}>
              <button
                type="button"
                className="text-white bg-cyan-600 to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={telegram} className="h-8 w-8" alt="" />
              </button>
              </a>
            </div> 
            )} 
            {userData.web && (
            <div className="items-center">
              <a href={userData.web}>
              <button
                type="button"
                className="text-white bg-white to-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium shadow-lg rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
              >
                <img src={web} className="h-8 w-8" alt="" />
              </button>
              </a>
            </div>)}
          </div>
        </div>
      </div>
      {userData.googleReview && (
      <div className="flex justify-center mt-2">
      <button type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 ">
        <img src={googleReview} className="h-6 w-6 mr-3" alt="review icon" />    Laissez-nous votre avis
      </button>
      </div>)}
      {userData.tripadvisor && (
      <div className="flex justify-center mt-2">
      <button type="button" class="text-gray-900 bg-[#30E1A2] hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 ">
        <img src={tripadvisor} className="h-6 w-6 mr-3" alt="review icon" />    Reviews us on
      </button>
      </div>)}
      <div className="p-4 border-t mx-8 mt-2">
        <button onClick={handleDownload} className="block mx-auto rounded-xl bg-blue-700 hover:shadow-lg font-semibold shadow-lg shadow-gray-600 text-white px-6 py-2">
          Enregistrer le contact 🔗
        </button>
      </div>


      <div className="flex flex-col items-center" >
      <div className="mx-4 mb-4 mt-4 max-w-sm p-6 px-20 md:px-20 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
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
      </div>
      <Footer/>
    </div>
    </div>
  );
}

export default Profile;
