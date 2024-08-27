import React from 'react';
import logo from '../assets/gray-logo-CONNECT.svg';
import panier from '../assets/panier.svg';

const Navigation = ({ formData }) => {
    const quantity = formData.quantity ? parseInt(formData.quantity, 10) : 0;
  return (
    <nav className="flex justify-between items-center mt-10 p-4 font-sans font-bold">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-16 ml-6" />
      </div>
      <div className="flex items-center mr-3 relative">
        <div className="border-2 border-black p-3 rounded-full">
          <img src={panier} alt="Panier" className="h-6 w-6" />
        </div>
        {quantity > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            {quantity}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;