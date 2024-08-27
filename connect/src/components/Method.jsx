import React, { useState,useEffect, useRef } from 'react';
import cardPayment from '../assets/cardPayment.svg';
import bitcoin from '../assets/bitcoin.svg';
import moneyPayment from '../assets/moneyPayment.svg';
import codePlace from '../assets/codePlace.svg';
import endStep from '../assets/derniereEtape.svg';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';
import StripeContainer from './StripeContainer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import bgVert from '../assets/bgVert.svg';
import argentZone from '../assets/bgArgent.svg';
import visa from '../assets/visa.svg';
import master from '../assets/masterCard.svg';
import paypal from '../assets/paypal.svg';
import applePay from '../assets/applePay.svg';
import stripe from '../assets/stripe.svg';
import whatsapp from '../assets/whatsapp.svg';
import WhatsAppPaymentRequest from './WhatsappPaymentRequest';

function Method({ formData, setFormData, onPaymentSuccess }) {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState(formData.method || '');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const stripeContainerRef = useRef(null);
    const whatsappContainerRef = useRef(null);
    const [promoCode, setPromoCode] = useState('');
    const [promoError, setPromoError] = useState('');

    useEffect(() => {
        if ((selectedMethod === 'card' && stripeContainerRef.current) ||
            (selectedMethod === 'money' && whatsappContainerRef.current)) {
            setTimeout(() => {
                const ref = selectedMethod === 'card' ? stripeContainerRef : whatsappContainerRef;
                ref.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    }, [selectedMethod]);

    const handlePaymentSuccess = async () => {
        try {
          await axios.post(`${API_URL}/create-user`, {
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
          });
          toast.success("Paiement réussi et compte créé avec succès !");
          setPaymentSuccess(true);
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur:", error);
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error || "Cet utilisateur existe déjà.");
            } else {
                toast.error("Erreur lors de la création du compte. Veuillez contacter le support.");
            }
        }
      };

      const handleWhatsAppSuccess = (message) => {
        toast.success(message);
        setTimeout(() => {
            navigate("/login");
          }, 5000);
    };

    const handleMethodSelect = (method) => {
        if (method !== 'coin') { // Empêcher la sélection de 'coin'
            setSelectedMethod(method);
        }
    };
    
    const handlePromoCodeSubmit = () => {
        const trimmedCode = promoCode.trim();
        
        if (trimmedCode === '') {
            setPromoError('Veuillez entrer un code promo.');
            return;
        }

        if (trimmedCode.length < 6 || !/[a-zA-Z]/.test(trimmedCode) || !/[0-9]/.test(trimmedCode)) {
            setPromoError('Le code promo est incorrect !');
            return;
        }

        setPromoError('');
        toast.info(`Code promo "${trimmedCode}" soumis pour validation`);
        setTimeout(() => {
            navigate("/login");
          }, 3000);
    };
    
    const handleWhatsAppError = (message) => {
        toast.error(message);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4">
            <ToastContainer/>
            <img src={endStep} alt="Dernière étape" className="mb-10 w-48 -ml-32 mt-5" />

            <div className="space-y-4 w-full mb-6">
                {/* Bouton de paiement par carte */}
                <div 
                    className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
                        selectedMethod === 'card' ? 'transform scale-105 shadow-lg' : 'transform scale-100'
                    }`}
                    onClick={() => setSelectedMethod('card')}
                >
                    <img src={bgVert} alt="" className="w-full h-auto" />
                    {selectedMethod === 'card' && (
                        <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl"></div>
                    )}
                    <div className="absolute inset-0 rounded-2xl items-center justify-between p-4">
                    <h1 className='text-xl text-white ml-2 font-medium'>Je règle par carte</h1>
                    <div className='flex flex-row items-end ml-2 mt-4 gap-3 space-y-2'>
                        <img src={visa} alt="visa icon" className="h-6 w-auto" />
                        <img src={master} alt="master carte icon" className="h-6 w-auto" />
                        <img src={applePay} alt="apple pay carte method" className="h-6 w-auto" />
                        <img src={paypal} alt="paypal" className="h-6 w-auto" />
                        <img src={stripe} alt="stripe" className="h-6 w-auto" />
                    </div>
                        <p className='text-white font-normal text-2xs mt-2 ml-2'>Recommandé pour des livraisons rapides</p>
                    </div>
                </div>

                {/* Bouton de paiement High-Tech */}
                <div className="relative cursor-not-allowed opacity-50">
                    <img src={bgVert} alt="" className="w-full h-auto" />
                    <div className="absolute inset-0 rounded-2xl items-center justify-between p-4">
                        <h1 className='text-xl text-white ml-2 font-medium'>Je suis High-Tech</h1>
                        <div className='flex flex-row items-end ml-2 mt-4 gap-3 space-y-2'>
                            <img src={bitcoin} alt="bitcoin icon" className="h-6 w-auto" />
                        </div>
                        <p className='text-white font-normal text-2xs mt-2 ml-2'>Paiement par Bitcoin temporairement indisponible</p>
                    </div>
                </div>

                {/* Bouton Mobile Money */}
                <div 
                    className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
                        selectedMethod === 'money' ? 'transform scale-105 shadow-lg' : 'transform scale-100'
                    }`}
                    onClick={() => setSelectedMethod('money')}
                >
                    <img src={argentZone} alt="" className="w-full h-auto" />
                    {selectedMethod === 'money' && (
    <div ref={whatsappContainerRef} className="w-full mb-6 z-10">
        <WhatsAppPaymentRequest formData={formData} onSuccess={handleWhatsAppSuccess}
                            onError={handleWhatsAppError} />
    </div>
)}
                    <div className="absolute inset-0 rounded-2xl items-center justify-between p-4">
                    <h1 className='text-xl text-white ml-2 font-medium'>Mobile Money</h1>
                    <p className='text-white font-medium text-2xs ml-2'>Actuellement indisponible....
Vous serez redirigé vers notre équipe 
pour finaliser votre commande...</p>
                    <div className='flex flex-row items-end ml-2 mt-2 gap-3 space-y-2'>
                        <img src={whatsapp} alt="visa icon" className="h-6 w-auto" />
                    </div>
                        <p className='text-white font-normal text-2xs mt-2 ml-2'>Recommandé pour des livraisons Ultra rapides</p>
                    </div>
                </div>

                {/* Bouton Code Promo */}
                <div 
                    className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
                        selectedMethod === 'code' ? 'transform scale-105 shadow-lg' : 'transform scale-100'
                    }`}
                    onClick={() => handleMethodSelect('code')}
                >
                    <img src={argentZone} alt="" className="w-full h-auto" />
                    {selectedMethod === 'code' && (
                        <div className="absolute inset-0 border-2 border-blue-500 rounded-xl"></div>
                    )}
                    <div className="absolute inset-0 rounded-2xl items-center justify-between p-4">
                    <h1 className='text-xl text-white ml-2 font-medium'>J'ai des privilèges</h1>
                    <p className='text-white font-medium text-2xs ml-2'>Vous disposez d'un code promo</p>
                    <div className='flex flex-row items-end ml-2 mt-2 gap-3 space-y-2'>
                        <img src={codePlace} alt="visa icon" className="h-6 w-auto" />
                    </div>
                        <p className='text-white font-normal text-2xs mt-2 ml-2'>Réduction totale ou partielle appliquée</p>
                    </div>
                </div>
            </div>

            {selectedMethod === 'code' && (
                <div className="w-full mb-4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Entrez votre code promo"
                            className={`flex-grow p-2 border ${promoError ? 'border-red-500' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            value={promoCode}
                            onChange={(e) => {
                                setPromoCode(e.target.value);
                                if (promoError) setPromoError('');
                            }}
                        />
                        <button
                            onClick={handlePromoCodeSubmit}
                            className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition-colors duration-300"
                        >
                            Valider
                        </button>
                    </div>
                    {promoError && (
    <p className="text-red-500 text-sm mt-1">{promoError}</p>
)}
                </div>
            )}

            {selectedMethod === 'card' && (
    <div ref={stripeContainerRef} className="w-full mb-6">
        <StripeContainer 
            formData={formData} 
            onPaymentSuccess={handlePaymentSuccess}
        />
    </div>
)}
        </div>
    );
}

export default Method;