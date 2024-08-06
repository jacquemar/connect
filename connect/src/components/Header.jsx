import React from 'react';
import logo from '../assets/gray-logo-CONNECT.svg';
import profilIcon from '../assets/profil-icon.svg';

function Header({ activeSection, scrollToSection }) {

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center mt-4 p-4 font-sans font-bold w-full z-50">
        <div className="flex md:ml-10 items-center">
          <a href="https://connect2card.com">
          <img src={logo} alt="Logo" className="h-20 ml-6" /></a>
        </div>
        <div className="hidden md:flex mx-20 items-center justify-between flex-grow">
          <button
            onClick={() => scrollToSection(0)}
            className={`flex-grow text-center w-1/3 mx-2 px-4 py-2 rounded-full ${activeSection === 0 ? 'border-4 border-black text-black' : 'text-black'}`}
          >
            Accueil
          </button>
          <button
            onClick={() => scrollToSection(1)}
            className={`flex-grow text-center w-1/3 mx-2 px-4 py-2 rounded-full ${activeSection === 1 ? 'border-4 border-black text-black' : 'text-black'}`}
          >
            Interface
          </button>
          <button
            onClick={() => scrollToSection(2)}
            className={`flex-grow text-center w-2/3 mx-2 px-4 py-2 rounded-full ${activeSection === 2 ? 'border-4 border-black text-black' : 'text-black'}`}
          >
            Pourquoi ?
          </button>
          <button
            onClick={() => scrollToSection(3)}
            className={`flex-grow text-center w-1/3 mx-2 px-4 py-2 rounded-full ${activeSection === 3 ? 'border-4 border-black text-black' : 'text-black'}`}
          >
            Nos offres
          </button>
          <button
            onClick={() => scrollToSection(4)}
            className={`flex-grow text-center w-1/3 mx-2 px-4 py-2 rounded-full ${activeSection === 4 ? 'border-4 border-black text-black' : 'text-black'}`}
          >
            Infos
          </button>
          <button className="flex-grow text-center w-1/3 mx-2 px-4 py-2 bg-[#8DC63F] text-white rounded-full"><a href="https://connect2card.com/login">
            Se connecter</a>
          </button>
          <div className="ml-4">
            <img src={profilIcon} alt="Profile" className="h-auto w-32 rounded-full" />
          </div>
        </div>
        <div className="flex md:hidden mr-4 items-center">
          <a href="https://connect2card.com/login">
          <img src={profilIcon} alt="Profile" className="h-10 w-10 rounded-full" /></a>
        </div>
      </nav>
    </div>
  );
}

export default Header;
