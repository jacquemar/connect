import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import vosInfos from '../assets/vosInfos.svg';
import argentStep from '../assets/stepArgent.svg';

function Informations({ formData, setFormData }) {
    const [phoneValid, setPhoneValid] = useState(true);
    const fileInputRef = useRef(null);
    // Fonction de validation du numéro de téléphone
    const validatePhoneNumber = (phone) => {
        return phone.length > 9;
    };

    // Fonction de gestion des changements de champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Fonction pour gérer l'upload du logo
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    logo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Fonction pour déclencher le clic sur l'input file caché
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        setPhoneValid(validatePhoneNumber(formData.phoneNumber || ''));
    }, [formData.phoneNumber]);

    console.log(formData)

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
               <ToastContainer/>
            {/* Image du titre */}
            <img src={vosInfos} alt="Vos Infos pour l'envoi" className="mt-8 w-52 mr-28" />
            
            {/* Conteneur de l'image argentStep avec le texte et le panier superposés */}
            <div className="relative w-full mt-8">
                <img src={argentStep} alt="Étape Argent" className="w-full" />
                {/* Ici, vous pouvez superposer du texte ou le panier si nécessaire */}
            </div>
            
            {/* Formulaire */}
            <form className="w-full mt-8 ">
                <label htmlFor="email" className='text-xs font-bold ml-3'>Adresse Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border-gray-200 rounded-lg"
                />

                <label htmlFor="userName" className='text-xs font-semibold ml-3'>Pseudo de connexion</label>
                <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border-gray-200 rounded-lg"
                />

                <label htmlFor="nom" className='text-xs font-semibold ml-3'>Nom</label>
                <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border-gray-200 rounded-lg"
                />

                <label htmlFor="prenom" className='text-xs font-semibold ml-3'>Prénom</label>
                <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border-gray-200 rounded-lg"
                />

                <label htmlFor="phoneNumber" className='text-xs font-semibold ml-3'>Numéro de téléphone</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                        handleChange(e);
                        setPhoneValid(validatePhoneNumber(e.target.value));
                    }}
                    className={`w-full p-2 mb-4 border-gray-200 ${phoneValid ? 'ring-gray-300' : 'ring-red-500'} rounded-lg`}
                />
                {!phoneValid && (
                    <p className="text-xs text-red-500">Le numéro de téléphone n'est pas valide.</p>
                )}

                <label htmlFor="password" className='text-xs font-semibold ml-3'>Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border-gray-200 rounded-lg"
                />

                <div className="flex justify-center gap-3 items-center mt-4">
                    <button type="button" onClick={triggerFileInput}  className="px-4 py-2 font-semibold bg-black text-white rounded-full">
                        Ajouter logo*
                    </button>
                    <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleLogoUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>
                {formData.logo && (
                    <div className="mt-4 flex justify-center">
                        <img src={formData.logo} alt="Logo prévisualisé" className="w-32 h-32 object-contain" />
                    </div>
                )}
            </form>

            {/* Note */}
            <p className="mt-4 text-center text-sm text-gray-500">
                *L'ajout de visuel est possible & gratuit pour les profils Silver, Gold et Platinum
            </p>
        </div>
    );
}

export default Informations;
