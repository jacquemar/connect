import React, { useState, useEffect } from 'react';
import nosOffresParticulier from '../assets/nosOffresParticuliers.svg';
import bronzeSelect from '../assets/bronzeSelect.png';
import argentSelect from '../assets/argentSelect.png';
import orSelect from '../assets/orSelect.png';
import platiniumSelect from '../assets/platiniumSelect.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

function Particuliers({ formData, setFormData }) {
  const [selectedOffer, setSelectedOffer] = useState(formData.offer || '');
  const [quantity, setQuantity] = useState(formData.quantity || 1);

  useEffect(() => {
    if (selectedOffer) {
      const offer = offers.find(o => o.name === selectedOffer);
      setQuantity(offer.minQuantity);
    }
  }, [selectedOffer]);

  const offers = [
    { name: 'Bronze', image: bronzeSelect, minQuantity: 1, maxQuantity: 4 },
    { name: 'Silver', image: argentSelect, minQuantity: 5, maxQuantity: 14 },
    { name: 'Gold', image: orSelect, minQuantity: 15, maxQuantity: 29 },
    { name: 'Platinum', image: platiniumSelect, minQuantity: 30, maxQuantity: 100 },
  ];

  const handleSelectOffer = (offerName) => {
    setSelectedOffer(offerName);
    const offer = offers.find(o => o.name === offerName);
    setQuantity(offer.minQuantity);
    setFormData({ ...formData, offer: offerName, quantity: offer.minQuantity });
  };

  const handleDecrement = () => {
    const offer = offers.find(o => o.name === selectedOffer);
    if (quantity > offer.minQuantity) {
      setQuantity(quantity - 1);
      setFormData({ ...formData, quantity: quantity - 1 });
    }
  };

  const handleIncrement = () => {
    const offer = offers.find(o => o.name === selectedOffer);
    if (quantity < offer.maxQuantity) {
      setQuantity(quantity + 1);
      setFormData({ ...formData, quantity: quantity + 1 });
    }
  };

  return (
    <div className="flex flex-col items-start w-full max-w-md mx-auto">
         <ToastContainer/>
      <img src={nosOffresParticulier} alt="Nos offres NFC Particuliers" className="mt-8 w-52 mr-16" />
      <span id="badge-dismiss-green" className="inline-flex items-center px-2 mt-6 ml-28 mb-6 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
      {` ${selectedOffer} - ${quantity} cartes`}
      </span>
      <div className="space-y-4 w-full">
        {offers.map((offer) => (
          <div 
            key={offer.name}
            className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
              selectedOffer === offer.name ? 'transform scale-105' : 'transform scale-100'
            }`}
            onClick={() => handleSelectOffer(offer.name)}
          >
            <img 
              src={offer.image} 
              alt={offer.name} 
              className="w-full rounded-lg"
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
            {selectedOffer === offer.name && (
              <div className="absolute inset-0 rounded-lg"></div>
            )}
          </div>
        ))}
      </div>

      {selectedOffer && (
        <div className="mt-4 w-full">
          
          <div className="relative flex items-center justify-center mt-2">
            <button 
              type="button" 
              onClick={handleDecrement} 
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-8 w-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
              </svg>
            </button>
            <input 
              type="text" 
              value={quantity} 
              readOnly 
              className="mx-2 text-center w-12 bg-transparent border-0 text-gray-900 dark:text-white text-lg font-medium focus:outline-none"
            />
            <button 
              type="button" 
              onClick={handleIncrement} 
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-8 w-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      

    </div>
  );
}

export default Particuliers;
