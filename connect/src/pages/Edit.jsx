import bg from "../assets/bg-connect.jpg";
import API_URL from "../config"; 
import { useMediaQuery } from 'react-responsive';
import placeholder from "../assets/placeholder.png";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";




const Edit = () => {
  // états pour les URLs des images
  const [banniereURL, setBanniereURL] = useState('');
  const [photoProfilURL, setPhotoProfilURL] = useState('');

  //etat pour les donnee du formulaire
  const [nomComplet, setNomComplet] = useState("");
  const [titre, setTitre] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [facebook, setfacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [twitter, setTwitter] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const [behance, setBehance] = useState("");
  const [telegram, setTelegram] = useState("");
  const [service1, setService1] = useState("");
  const [service2, setService2] = useState("");
  const [service3, setService3] = useState("");
  const [service4, setService4] = useState("");

//états pour les checkbox des réseaux sociaux
const [isFacebookChecked, setIsFacebookChecked] = useState(false);
const [isInstagramChecked, setIsInstagramChecked] = useState(false);
const [isSnapchatChecked, setIsSnapchatChecked] = useState(false);
const [isYoutubeChecked, setIsYoutubeChecked] = useState(false);
const [isTiktokChecked, setIsTiktokChecked] = useState(false);
const [isTwitterChecked, setIsTwitterChecked] = useState(false);
const [isWhatsappChecked, setIsWhatsappChecked] = useState(false);
const [isPinterestChecked, setIsPinterestChecked] = useState(false);
const [isLinkedinChecked, setIsLinkedinChecked] = useState(false);
const [isEmailChecked, setIsEmailChecked] = useState(false);
const [isBehanceChecked, setIsBehanceChecked] = useState(false);
const [isTelegramChecked, setIsTelegramChecked] = useState(false);


const [userData, setUserData] = useState(false);
const navigate = useNavigate();
const logoutUser = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate("/login"); // Naviguer vers la page d'historique
    }, 1000);
    toast.error("Votre session a expiré. Veuillez vous reconnecter.");
  };

useEffect(() => {
	const getUserData = () => {
	const token = localStorage.getItem('token');
	if (!token) {
		logoutUser()
	}
  
	try {
		const decodedToken = jwtDecode(token);
		if (decodedToken.exp * 1000 < Date.now()) {
			setTimeout(() => {
				navigate("/dashboard"); // Redirection vers la page de tableau de bord
			}, 1000);
		}
  
		const userId = decodedToken.userId;
		axios.get(`${API_URL}/api/users/${userId}`)
		.then((response) => {
			setUserData(response.data);
			console.log(userData);
		})
		.catch(error => {
			logoutUser();
			console.error('Erreur lors de la récupération des informations utilisateur:', error);
			toast.error('Erreur lors de la récupération des informations utilisateur');
		});
	} catch (error) {
		console.error('Erreur lors du décodage du token:', error);
		setTimeout(() => {
			navigate("/login"); // Redirection vers la page de tableau de bord
		}, 1000);
	}
	};
  
	getUserData();
  }, []);
  
// Gestionnaire d'événement pour la bannière
const handleBanniereUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_URL}/upload/banniere`, formData);
        const url = response.data.url;
        setBanniereURL(url); // Mettre à jour l'URL de la bannière dans le state
    } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'envoi de la bannière :', error);
    }
};

// Gestionnaire d'événement pour la photo de profil
const handlePhotoProfilUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_URL}/upload/photoProfil`, formData);
        const url = response.data.url;
        setPhotoProfilURL(url); // Mettre à jour l'URL de la photo de profil dans le state
    } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'envoi de la photo de profil :', error);
    }
};

// Gestionnaire d'événement pour la saisie des URL 
const handleFacebookInputChange = () => {
	setIsFacebookChecked(!isFacebookChecked);
	
  };
const handleInstagramInputChange = () => {
	setIsInstagramChecked(!isInstagramChecked);
	
  };
const handleSnapchatInputChange = () => {
	setIsSnapchatChecked(!isSnapchatChecked);
	
  };
const handleYoutubeInputChange = () => {
	setIsYoutubeChecked(!isYoutubeChecked);
	
  };
const handleTiktokInputChange = () => {
	setIsTiktokChecked(!isTiktokChecked);
	
  };
const handleTwitterInputChange = () => {
	setIsTwitterChecked(!isTwitterChecked);
	
  };
const handleWhatsappInputChange = () => {
	setIsWhatsappChecked(!isWhatsappChecked);
	
  };
const handlePinterestInputChange = () => {
	setIsPinterestChecked(!isPinterestChecked);
	
  };
const handleLinkedinInputChange = () => {
	setIsLinkedinChecked(!isLinkedinChecked);
	
  };
const handleEmailInputChange = () => {
	setIsEmailChecked(!isEmailChecked);
	
  };
const handleBehanceInputChange = () => {
	setIsBehanceChecked(!isBehanceChecked);
	
  };
const handleTelegramInputChange = () => {
	setIsTelegramChecked(!isTelegramChecked);
	
  };

    // Fonction de rappel pour gérer les modifications du numéro de téléphone
const handlePhoneNumberChange = (event) => {
    let phoneNumberValue = event.target.value;

    // Supprimer tous les caractères non numériques
    phoneNumberValue = phoneNumberValue.replace(/\D/g, "");

    // Mettre à jour l'état avec le numéro de téléphone
    setPhoneNumber(phoneNumberValue);
	
};


	// Fonction de rappel pour gérer les modifications des champs selectionné
	const handleFacebookDataChange = (event) => {
		setfacebook(event.target.value);		
	};
	const handleInstagramDataChange = (event) => {
		setInstagram(event.target.value);		
	};
	const handleSnapchatDataChange = (event) => {
		setSnapchat(event.target.value);
	};
	const handleYoutubeDataChange = (event) => {
		setYoutube(event.target.value);
	};
	const handleTiktokDataChange = (event) => {
		setTiktok(event.target.value);
	};
	const handleTwitterDataChange = (event) => {
		setTwitter(event.target.value);
	};
	const handleWhatsappDataChange = (event) => {
		setWhatsapp(event.target.value);
	};
	const handlePinterestDataChange = (event) => {
		setPinterest(event.target.value);
	};
	const handleLinkedinDataChange = (event) => {
		setLinkedin(event.target.value);
	};
	const handleEmailDataChange = (event) => {
		setEmail(event.target.value);
	};
	const handleBehanceDataChange = (event) => {
		setBehance(event.target.value);
	};
	const handleTelegramDataChange = (event) => {
		setTelegram(event.target.value);
	};
	const handleNomCompletDataChange = (event) => {
		setNomComplet(event.target.value);
	};
	const handleTitreDataChange = (event) => {
		setTitre(event.target.value);
	};
	const handleService1DataChange = (event) => {
		setService1(event.target.value);
	};
	const handleService2DataChange = (event) => {
		setService2(event.target.value);
	};
	const handleService3DataChange = (event) => {
		setService3(event.target.value);
	};
	const handleService4DataChange = (event) => {
		setService4(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault()
	
		try {
			const token = localStorage.getItem('token');
			const userId = jwtDecode(token).userId;
			// Envoi des données du formulaire au serveur
			const response = await axios.put(`${API_URL}/edit/profil/${userId}`, {
				photoProfilURL,
				banniereURL,
				nomComplet,
				titre,
				phoneNumber,
				service1,
				service2,
				service3,
				service4,
				facebook: isFacebookChecked ? facebook : null,
				instagram: isInstagramChecked ? instagram : null,
				snapchat: isSnapchatChecked ? snapchat : null,
				youtube: isYoutubeChecked ? youtube : null,
				tiktok: isTiktokChecked ? tiktok : null,
				twitter: isTwitterChecked ? twitter : null,
				whatsapp: isWhatsappChecked ? whatsapp : null,
				pinterest: isPinterestChecked ? pinterest : null,
				linkedin: isLinkedinChecked ? linkedin : null,
				mail: isEmailChecked ? email : null,
				behance: isBehanceChecked ? behance : null,
				telegram: isTelegramChecked ? telegram : null,
			});
	
			if (response) {
				toast.success("Profil mis à jour avec succès !");
				setTimeout(() => {
					navigate("/dashboard"); // Redirection vers la page de tableau de bord
				}, 1000);
			} else {
				// Gestion des erreurs si nécessaire
			}
		} catch (error) {
			if (error.response) {
				// L'erreur provient de la réponse HTTP du serveur
				toast.error(error.response.data.error);
			} else {
				// Une autre erreur s'est produite
				toast.error("Une erreur est survenue lors de l'ajout de l'utilisateur !");
			}
		}
	};


	

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (

     
<div className={`min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 relative items-center ${isMobile ? 'bg-gradient-to-r from-cyan-600 to-green-400' : 'bg-center bg-gray-500 bg-no-repeat bg-cover'}`}>
      {isMobile && (
        <div className="absolute opacity-60 inset-0 z-0"></div>
      )}
      {!isMobile && (
        <div className="absolute opacity-60 inset-0 z-0"><img src={bg} alt="connect-bg" /></div>
      )}
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
<div className="grid  gap-8 grid-cols-1">
<ToastContainer />
	<div className="flex flex-col ">
			<div className="flex flex-col sm:flex-row items-center">
				<h2 className="font-semibold text-lg  text-center">Modifier vos informations</h2>
				<div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
			</div>
			<div className="mt-5">
				<div className="form">
					<div className="md:space-y-2 mb-3">
						<label className="text-xs font-semibold text-gray-600 py-2">Photo de Profil</label>
						<div className="flex items-center py-6">
							<div className="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
								<img className="w-12 h-12 mr-4 object-cover" src={photoProfilURL || placeholder} alt="Photo de profil"/>
                </div>
								<label className="cursor-pointer ">
                  <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">Parcourir</span>
                  <input type="file" className="hidden" onChange={handlePhotoProfilUpload} accept="image/*"></input>
                </label>
							</div>
              <label className="text-xs font-semibold text-gray-600 py-2">Bannière de Profil</label>
              <div className="flex items-center py-6">
							<div className="w-24 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
								<img className="w-24 h-12 mr-4 object-cover" src={banniereURL || placeholder} alt="Bannière de profil"/>
                </div>
								<label className="cursor-pointer ">
                  <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">Parcourir</span>
                  <input type="file" className="hidden" onChange={handleBanniereUpload} accept="image/*"></input>
                </label>
							</div>
						</div>
						<div className="md:flex flex-row md:space-x-4 w-full text-xs">
							<div className="mb-3 space-y-2 w-full text-xs">
								<label className="font-semibold text-gray-600 py-2">Nom complet</label>
								<input placeholder="Nom & Prénoms" onChange={handleNomCompletDataChange} value={nomComplet} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="nomComplet" id="nc"></input>
								
							</div>
							<div className="mb-3 space-y-2 w-full text-xs">
								<h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Titre/Profession</h3>
								<input placeholder="Avocat d'affaire ⚖️" onChange={handleTitreDataChange} value={titre} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="titre" id="titre"></input>	
							</div>
						</div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Réseaux Sociaux</h3>

            <div className="mb-4"><label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" onChange={handleFacebookInputChange} checked={isFacebookChecked} className="sr-only peer"></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-900 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-800"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mb-10">Facebook</span>
</label>
{isFacebookChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder=" votre lien facebook" onChange={handleFacebookDataChange} value={facebook} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="facebook" id="fb"
  ></input>
		</div>
 </div>
        )}
</div>
<div className="mb-4">
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" className="sr-only peer" onChange={handleInstagramInputChange} checked={isInstagramChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-500"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Instagram</span>
</label>
{isInstagramChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien instagram" onChange={handleInstagramDataChange} value={instagram}className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="instagram" id="ig"
  ></input>
		</div>
 </div>
        )}
</div>
<div className="mb-4">
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handleSnapchatInputChange} checked={isSnapchatChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-200 dark:peer-focus:ring-yellow-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Snapchat</span>
</label>
{isSnapchatChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien Snapchat" onChange={handleSnapchatDataChange} value={snapchat} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="snapchat" id="snap"
  ></input>
		</div>
 </div>
        )}</div>
<div className="mb-4"> 
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handleYoutubeInputChange} checked={isYoutubeChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Youtube</span>
</label>
{isYoutubeChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien Youtube" onChange={handleYoutubeDataChange} value={youtube}className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="youtube" id="yt"
  ></input>
		</div>
 </div>
        )}</div>
<div className="mb-4"> 
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handleTiktokInputChange} checked={isTiktokChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">TikTok</span>
</label>
{isTiktokChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien Tiktok" onChange={handleTiktokDataChange} value={tiktok} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="tiktok" id="tk"
  ></input>
		</div>
 </div>
        )}</div>
<div className="mb-4"> 
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handleTwitterInputChange} checked={isTwitterChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Twitter</span>
</label>
{isTwitterChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien Twitter" onChange={handleTwitterDataChange} value={twitter} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="twitter" id="twi"
  ></input>
		</div>
 </div>
        )}</div>
<div className="mb-4"> 
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handleWhatsappInputChange} checked={isWhatsappChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Whatsapp</span>
</label>
{isWhatsappChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien Whatsapp" onChange={handleWhatsappDataChange} value={whatsapp} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="whatsapp" id="wha"
  ></input>
		</div>
 </div>
        )}</div>
<div className="mb-4"> 
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handlePinterestInputChange} checked={isPinterestChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Pinterest</span>
</label>
{isPinterestChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien Pinterest" onChange={handlePinterestDataChange} value={pinterest} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="pinterest" id="pint"
  ></input>
		</div>
 </div>
        )}</div>
<div className="mb-4"> 
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handleLinkedinInputChange} checked={isLinkedinChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">LinkedIn</span>
</label>
{isLinkedinChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien Linkedin" onChange={handleLinkedinDataChange} value={linkedin} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="linkedin" id="lk"
  ></input>
		</div>
 </div>
        )}</div>
<div className="mb-4">
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handleEmailInputChange} checked={isEmailChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-700"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
</label>
{isEmailChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="votre adresse email" onChange={handleEmailDataChange} value={email} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="email" id="mail"
  ></input>
		</div>
 </div>
        )}</div>
<div className="mb-4">
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handleBehanceInputChange} checked={isBehanceChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Behance</span>
</label>
{isBehanceChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien Behance" onChange={handleBehanceDataChange} value={behance} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="behance" id="be"
  ></input>
		</div>
 </div>
        )}</div>

<div className="mb-4">
<label className=" items-center me-5 cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" onChange={handleTelegramInputChange} checked={isTelegramChecked}></input>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-800"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Telegram</span>
</label>
{isTelegramChecked && (
          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
		<div className="w-full flex flex-col mb-3">
			<input placeholder="lien Telegram" onChange={handleTelegramDataChange} value={telegram} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="telegram" id="tg"
  ></input>
		</div>
 </div>
        )}
</div>
<div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
	<div className="w-full flex flex-col mb-3">
		<label className="font-semibold text-gray-600 py-2">Numéro de téléphone</label>
		<input placeholder="+2250102030405" value={phoneNumber}
                onChange={handlePhoneNumberChange} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="number" name="telephone" id="tel"></input>
	</div>
</div>
<div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
	<div className="w-full flex flex-col mb-3">
		<label className="font-semibold text-gray-600 py-2">Liste des Services que vous proposez</label>
		<input placeholder="service 1" onChange={handleService1DataChange} value={service1} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="service1" id="serv1"></input>
	</div>
</div>	
<div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
	<div className="w-full flex flex-col mb-3">
		
		<input placeholder="service 2" onChange={handleService2DataChange} value={service2} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="service2" id="ser2"></input>
	</div>
</div>
<div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
	<div className="w-full flex flex-col mb-3">
		
		<input placeholder="service 3" onChange={handleService3DataChange} value={service3} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="service3" id="serv3"></input>
	</div>
</div>			
<div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
	<div className="w-full flex flex-col mb-3">
		
		<input placeholder="service 4" onChange={handleService4DataChange} value={service4} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="service4" id="serv4"></input>
	</div>
</div>
								
								<div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
									<button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Annuler </button>
									<button onClick={handleSubmit}className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Enregistrer</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    </div>
  );
};

export default Edit;
