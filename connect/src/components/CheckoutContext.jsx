import React, { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState({
    userType: '', // 'particulier' ou 'entreprise'
    
  });

  const updateCheckoutData = (newData) => {
    setCheckoutData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <CheckoutContext.Provider value={{ checkoutData, updateCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);