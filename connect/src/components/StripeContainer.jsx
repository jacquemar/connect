import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm'; 

const stripePromise = loadStripe('pk_live_51PlSVhLX1PbDjaKGvlWxs3Mj9LVvJxMg7TwbvL0n9D39mFTngG5P25DO96YoeWIsTGJYmA069mPH8To0mvaCGFGb00d5cxCwi5'); 

const StripeContainer = ({ formData, onPaymentSuccess }) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm 
                formData={formData} 
                onPaymentSuccess={onPaymentSuccess}
            />
        </Elements>
    );
};

export default StripeContainer;
