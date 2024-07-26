import API_URL from "../config";
import React from 'react'
import Footer from '../components/Footer'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
    const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000);
    try {
      await axios.post(`${API_URL}/api/forgot-password`, { email });
      setMessage("Un e-mail de réinitialisation a été envoyé.");
      console.log("Un e-mail de réinitialisation a été envoyé.")
      setTimeout(() => {
        navigate("/login");
      }, 3000)
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'e-mail de réinitialisation.");
    }
  };


  return (
    <div>
        
<div className="antialiased bg-white">
    <div className="max-w-lg mx-4 my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Réinitialisation</h1>
        <p className="text-slate-500">Entrez votre adresse Email pour recevoir le lien de récupération  </p>

        <form action="" className="my-10">
            <div className="flex flex-col space-y-5">
                <label for="email">
                    <p className="font-medium text-slate-700 pb-2">Adresse Email</p>
                    <input id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Entrez votre adresse email"></input>
                </label>
               
                <button onClick={handleSubmit} disabled={isDisabled} className="w-full py-3 font-medium text-white bg-gradient-to-r from-cyan-600 to-green-400 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                      </svg>
                      
                      <span>Modfier le mot de passe</span>
                </button>
                <p className="text-center">Pas encore membre? <a href="https://connect2card.com/demande" className="text-cyan-600 font-medium inline-flex space-x-1 items-center"><span>Rejoignez-nous</span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></a></p>
            </div>
        </form>
    </div>
    
</div>
<Footer/>
    </div>
  )
}

export default ResetPassword