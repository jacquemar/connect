import React, { useState, useEffect } from 'react';
import cardPayment from '../assets/cardPayment.svg'
import coinPayment from '../assets/coinPayment.svg'
import moneyPayment from '../assets/moneyPayment.svg'
import codePromo from '../assets/codePromo.svg'
import endStep from '../assets/derniereEtape.svg'

function Method({ formData, setFormData }) {
    const [selectedMethod, setSelectedMethod] = useState(formData.method || '');

    const methods = [
        { name: 'card', image: cardPayment, label: 'Paiement par carte' },
        { name: 'coin', image: coinPayment, label: 'Paiement en cryptomonnaie' },
        { name: 'money', image: moneyPayment, label: 'Paiement en espèces' },
        { name: 'code', image: codePromo, label: 'Utiliser un code promo' },
    ];

    useEffect(() => {
        if (selectedMethod) {
            setFormData({ ...formData, method: selectedMethod });
        }
    }, [selectedMethod]);

    const handleSelectMethod = (methodName) => {
        setSelectedMethod(methodName);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
            <img src={endStep} alt="" />
            
            <div className="space-y-4 w-full">
                {methods.map((method) => (
                    <div 
                        key={method.name}
                        className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
                            selectedMethod === method.name ? 'transform scale-105 shadow-lg' : 'transform scale-100'
                        }`}
                        onClick={() => handleSelectMethod(method.name)}
                    >
                        <div className="bg-white rounded-lg p-4 flex items-center">
                            <img 
                                src={method.image} 
                                alt={method.label}
                                className="w-16 h-16 mr-4"
                            />
                            <span className="text-lg font-medium">{method.label}</span>
                        </div>
                        {selectedMethod === method.name && (
                            <div className="absolute inset-0 border-2 border-blue-500 rounded-lg"></div>
                        )}
                    </div>
                ))}
            </div>

            {selectedMethod === 'code' && (
                <div className="mt-4 w-full">
                    <input
                        type="text"
                        placeholder="Entrez votre code promo"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                    />
                </div>
            )}

            <button 
                className="mt-6 px-8 py-2 bg-[#8DC63F] text-white font-bold rounded-full hover:bg-[#7AB32E] transition-all duration-300"
                onClick={() => console.log('Méthode sélectionnée:', selectedMethod)}
            >
                Confirmer le paiement
            </button>
        </div>
    );
}

export default Method;