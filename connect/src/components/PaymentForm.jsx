import React, { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import API_URL from '../config';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

// Liste des pays avec leurs codes ISO
const COUNTRIES = [
    { code: 'CI', name: "Côte d'Ivoire" },
    { code: 'FR', name: 'France' },
    { code: 'US', name: 'États-Unis' },
    // Ajoutez d'autres pays selon vos besoins
];

const PaymentForm = ({ formData, onPaymentSuccess }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [address, setAddress] = useState({
        country: '',
        city: '',
        postalCode: ''
    });

    useEffect(() => {
        // Fonction pour détecter le pays de l'utilisateur
        const detectUserCountry = async () => {
            try {
                const response = await axios.get('https://ipapi.co/json/');
                const detectedCountry = response.data.country;
                setAddress(prev => ({ ...prev, country: detectedCountry }));
            } catch (error) {
                console.error("Erreur lors de la détection du pays:", error);
            }
        };

        detectUserCountry();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
    
        if (!stripe || !elements) {
            setError("Stripe n'est pas correctement chargé. Veuillez réessayer.");
            setProcessing(false);
            return;
        }
    
        const cardElement = elements.getElement(CardNumberElement);
    
        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    address: {
                        country: address.country,
                        city: address.city,
                        postal_code: address.postalCode,
                    },
                },
            });
    
            if (error) {
                setError(error.message || "Une erreur est survenue lors de la création du mode de paiement.");
                setProcessing(false);
                return;
            }
    
            if (!paymentMethod || !paymentMethod.id) {
                setError("Le mode de paiement n'est pas valide. Veuillez réessayer.");
                setProcessing(false);
                return;
            }
    
            const response = await axios.post(`${API_URL}/create-payment-intent`, {
                qte: formData.quantity,
                paymentMethodId: paymentMethod.id,
            });
    
            const { clientSecret } = response.data;

            if (!clientSecret) {
                setError('Une erreur est survenue lors de la création du paiement.');
                setProcessing(false);
                return;
            }

            // Confirmer le paiement avec le clientSecret
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id
            });

            if (confirmError) {
                setError(confirmError.message || 'Une erreur est survenue lors de la confirmation du paiement.');
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                setSucceeded(true);
                onPaymentSuccess();
                toast.success("Paiement effectué et compte créé avec succès !");
                console.log(paymentIntent);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError('Le paiement n’a pas été finalisé. Veuillez réessayer.');
            }
        } catch (error) {
            setError(error.message || 'Une erreur imprévue est survenue.');
        } finally {
            setProcessing(false);
        }
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="w-full p-4 bg-white rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Détails du paiement</h2>

            {/* Numéro de Carte */}
            <div className="mb-4">
                <label className="text-sm text-gray-600">Numéro de carte</label>
                <CardNumberElement options={CARD_ELEMENT_OPTIONS} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            {/* Date d'Expiration et CVV */}
            <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                    <label className="text-sm text-gray-600">Date d'expiration</label>
                    <CardExpiryElement options={CARD_ELEMENT_OPTIONS} className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex-1">
                    <label className="text-sm text-gray-600">CVC</label>
                    <CardCvcElement options={CARD_ELEMENT_OPTIONS} className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
            </div>

            {/* Adresse de facturation */}
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Adresse de facturation</h3>

            <div className="mb-4">
                <label className="text-sm text-gray-600">Pays</label>
                <select
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Sélectionnez un pays</option>
                    {COUNTRIES.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                    <label className="text-sm text-gray-600">Ville</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Ville"
                        value={address.city}
                        onChange={handleAddressChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex-1">
                    <label className="text-sm text-gray-600">Code Postal</label>
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Code Postal"
                        value={address.postalCode}
                        onChange={handleAddressChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            {/* Message d'erreur */}
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

            {/* Bouton de paiement */}
            <button
                type="submit"
                className={`w-full bg-[#22B473] text-white font-bold py-2 px-4 rounded ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#7AB32E] transition-all duration-300'}`}
                disabled={!stripe || processing || succeeded}
            >
                {processing ? 'Traitement...' : 'Payer'}
            </button>

            {/* Message de succès */}
            {succeeded && <div className="text-green-500 text-sm mt-2">Paiement réussi !</div>}
        </form>
    );
};

export default PaymentForm;
