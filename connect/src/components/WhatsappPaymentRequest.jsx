import React, { useState } from 'react';
import axios from 'axios';
import whatsappIcon from '../assets/whatsapp.svg';
import API_URL from '../config';

const WhatsAppPaymentRequest = ({ formData, onSuccess, onError }) => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const createCardRequest = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/create-demande`, {
                userName: formData.userName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                nom: formData.nom,
                prenom: formData.prenom,
                date: new Date().toISOString()
            });

            if (response.status === 201) {
                onSuccess("Votre demande a bien été prise en compte !");
                return true;
            } else {
                throw new Error(response.data.error || "Une erreur inattendue est survenue");
            }
        } catch (error) {
            console.error("Erreur lors de la création de la demande:", error);
            if (error.response && error.response.status === 400) {
                onError(error.response.data.error || "Cet utilisateur existe déjà.");
            } else {
                onError("Une erreur est survenue lors de la création de votre demande. Veuillez réessayer.");
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendWhatsApp = async (e) => {
        e.preventDefault();
        if (!isAgreed) {
            onError("Veuillez accepter les conditions avant d'envoyer la demande.");
            return;
        }

        const requestCreated = await createCardRequest();

        if (requestCreated) {
            const phoneNumber = '2250576229433';
            const message = encodeURIComponent(`Bonjour, mon nom est ${formData.nom} ${formData.prenom} je souhaite finaliser ma commande de ${formData.quantity} cartes par WhatsApp.`);
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4 z-10 relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Paiement via WhatsApp</h2>
            <p className="text-sm text-gray-600 mb-4">
                Le paiement mobile est actuellement indisponible. Notre équipe vous contactera via WhatsApp pour finaliser votre commande et organiser le paiement de manière sécurisée.
            </p>
          
            <div className="flex items-center mb-4">
                <input 
                    type="checkbox" 
                    id="agree" 
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                    className="mr-2 cursor-pointer"
                />
                <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer">
                    J'accepte d'être contacté via WhatsApp pour finaliser ma commande
                </label>
            </div>
            <button
                onClick={handleSendWhatsApp}
                disabled={!isAgreed || isLoading}
                className={`mt-4 w-full ${isAgreed && !isLoading ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center`}
            >
                {isLoading ? (
                    'Traitement en cours...'
                ) : (
                    <>
                        <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6 mr-2" />
                        Envoyer la demande sur WhatsApp
                    </>
                )}
            </button>
        </div>
    );
};

export default WhatsAppPaymentRequest;