import React from 'react';
import { useNavigate } from "react-router-dom";
import Png404 from "../assets/carte-erreur-03.png"


function Page404() {
    const navigate = useNavigate();
  return (
    <div>
      
<div class=" h-screen flex flex-col mt-16 md:w-96 md:justify-center items-center">
    <div className=''>
    <img src={Png404} alt="connexion perdue erreur 404 connect " /></div>
    <div class="flex flex-col items-center mb-5 justify-center">
        <a href="/home" class="flex items-center space-x-2 bg-[#8DC63F] hover:bg-blue-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150" title="Return Home">
            <span >Retourner à l'accueil</span>
        </a>
    </div>
</div>
    </div>
)};

export default Page404;