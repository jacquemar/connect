import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BasDePage from '../components/BasDePage';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import futurSvg from '../assets/future.svg';
import backgroundImage from '../assets/Dash_02.jpg';
import textInterface from '../assets/interface.svg';
import match from '../assets/match.svg';
import networking from '../assets/networking.png';
import salonPro from '../assets/salonpro.png';
import BtoB from '../assets/BtoB.png';
import nosOffres from '../assets/nosOffres.svg';
import offreBronze from '../assets/offreBronze.svg';
import offreArgent from '../assets/offreArgent.svg';
import offreOr from '../assets/offreOr.svg';
import offrePlatinium from '../assets/offrePlatiniumsvg.svg';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from "../config"; 

function Home() {

    const [activeSection, setActiveSection] = useState(0);
    const [nom, setNom] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sections = [
      { id: 'section1', label: 'Section 1' },
      { id: 'section2', label: 'Section 2' },
      { id: 'section3', label: 'Section 3' },
      { id: 'section4', label: 'Section 4' },
      { id: 'section5', label: 'Section 5' },
    ];

    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY + window.innerHeight / 2;
      
          // Trouver l'index de la section actuelle
          const currentSectionIndex = sections.findIndex((section, index) => {
            const element = document.getElementById(section.id);
            const nextElement = document.getElementById(sections[index + 1]?.id);
            const sectionTop = element ? element.offsetTop : 0;
            const sectionBottom = nextElement ? nextElement.offsetTop : Number.POSITIVE_INFINITY;
            
            return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
          });
      
          setActiveSection(currentSectionIndex);
        };
      
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [sections]);
      
    
      const scrollToSection = (index) => {
        const section = sections[index];
        const element = document.getElementById(section.id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth',
          });
        }
      };

      const handleSubmit = async (event) => {
        event.prevent.default();
        try {
          const response = await axios.post(`${API_URL}/send-message`,{
            nom,
            phone,
            email,
            message,
          });
          if (response.status === 201){
            toast.success("Message envoyé !");
          }
          
        } catch (error) {
          if (error.response) {
            
            toast.error(error.response.data.error);
          } else {
            
            toast.error("Une erreur est survenue lors de l'envoi de votre message");
          }
        }

      };

  return (
    <div>
      <Helmet>
                <title>Connect Card</title>
                <meta name="description" content="Renforcez votre présence en ligne avec la carte de visite 100% digital" />
                <meta name="keywords" content="carte de visite, digital, business card, connect"/>
                <link rel="canonical" href="https://connect2card.com"/>
                <meta property="og:title" content="Connect Card" />
                <meta property="og:description" content="Carte de visite 100% digital" />
                <meta property="og:image" content="https://connect2card.com/assets/bg-connect-BrHsARTI.jpg" />
                <meta property="og:url" content="https://connect2card.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Card de visite 100% Digital" />
                <meta name="twitter:description" content="Renforcez votre présence en ligne avec la carte de visite 100% digital" />
                <meta name="twitter:image" content="https://connect2card.com/assets/bg-connect-BrHsARTI.jpg" />
            </Helmet>
    <div className="relative min-h-screen">
      <Header activeSection={activeSection} scrollToSection={scrollToSection}/>
      <ToastContainer/>
      <div className="fixed top-1/2 transform -translate-y-1/2 right-2 md:right-8">
        {sections.map((section, index) => (
          <div
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-4 h-4 mb-2 rounded-full cursor-pointer ${
              activeSection === index ? 'bg-[#8DC63F]' : 'bg-white border-2 border-[#8DC63F]'
            }`}
          ></div>
        ))}
      </div>
      <section id="section1" className="w-full flex flex-col md:mb-36 md:flex-row md:mt-20 mt-44 ml-2 items-center md:p-6 p-2">
  <div className="w-full md:w-2/4 md:flex md:justify-end">
    <img src={image1} alt="Example" className="hidden md:block w-2/3 h-auto  md:ml-auto" />
  </div>
  <div className="w-full md:w-2/4 md:flex md:flex-col items-center md:items-start md:p-6 text-center md:text-left">
    <img 
      src={futurSvg} 
      alt="SVG Example" 
      className="w-full md:w-3/4 h-auto md:-ml-5 " 
    />
    <p className="mt-4 text-lg md:text-3xl mb-6">
  {/* Version pour les petits écrans (mobile) */}
  <span className="block md:hidden">
    Découvrez <span className="font-extrabold">CONNECT</span>, la révolution du networking. Partagez en un seul geste, mettez à jour et personnalisez facilement votre profil.
  </span>
  
  {/* Version pour les grands écrans (desktop) */}
  <span className="hidden md:block">
    Découvrez <span className="font-extrabold">CONNECT</span>, la révolution <br />
    du networking. Partagez en un seul geste, <br />
    mettez à jour et personnalisez facilement <br />
    votre profil.
  </span>
</p>
    <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#39BCC5] to-[#8084C0] font-sans font-semibold text-xl text-white rounded-full"><a href="https://connect2card.com/login">
      Démarrer</a>
    </button>
  </div>
</section>

      <section
      id="section2" className="ml-4 md:ml-0 bg-cover bg-center md:mt-6 md:p-6"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: '500px'
        }}
      >
        <div className="md:ml-24 mt-44 max-w-md">
          <img src={textInterface} alt='interface'  className="mt-40 mb-10"/>
          <p className="md:text-2xl md:ml-8 mt-44 ml-4 text-xl font-sans font-semibold text-black mb-20">
          Personnalisez <br />
          facilement votre profil..
          </p>
          <button className="px-6 mt-44 mb-52 ml-20 py-2 bg-gradient-to-r from-[#39BCC5] to-[#8084C0] font-sans font-semibold text-xl text-white rounded-full"><a href="https://connect2card.com/demande">
            Essayer</a>
          </button>
        </div> 
      </section>

      <section id="section3" className="p-6 flex mt-28 flex-col items-center">

        <div className="w-full mt-20 md:ml-36 ml-8 flex justify-center md:justify-start mb-20">
            <img src={match} alt="SVG Example" className="w-full font-sans font-extrabold md:w-1/3 h-auto" />
        </div>

        <div className="w-full mb-32 md:flex grid grid-cols-1 justify-around">
            <img src={networking} alt="networking" className="w-full md:w-1/4 h-auto" />
            <img src={salonPro} alt="salon pro" className="w-full md:w-1/4 h-auto" />
            <img src={BtoB} alt="btob" className="w-full md:w-1/4 h-auto" />
        </div>
      </section>

      <section id="section4" className="md:p-6 flex flex-col md:flex-row md:items-start">
  <div className="w-full md:w-2/5 mt-16 p-8 md:p-0 flex md:ml-24 ml-2 flex-col items-start">
    <img src={nosOffres} alt="SVG Example" className="md:w-1/2  h-auto md:mb-4 mb-24" />
    <div className="grid grid-cols-1 md:grid-cols-2 mb-8 md:mb-28 gap-4 w-full">
      <img src={offreBronze} alt="offre bronze" className="w-full h-auto" />
      <img src={offreArgent} alt="offre argent" className="w-full h-auto" />
      <img src={offreOr} alt="offre or" className="w-full h-auto" />
      <img src={offrePlatinium} alt="offre platinium" className="w-full h-auto" />
    </div>
  </div>

  
  <div className="w-full md:w-2/5 ml-4 flex mt-40 flex-col items-start md:ml-8">
    <h2 className="text-4xl uppercase font-extrabold mb-4">Supports <br />
        en parfaite <br />
        symbiose</h2>
    <p className="text-xl font-medium">Personnalisez-la selon <br />
        vos besoins pour une <br />présentation professionnelle <br />
        et unique.</p> 
    <p className='text-xl font-medium pt-3'>Profitez également de <br /> notre application web <br /> intuitive, <br />facilement accessible depuis n'importe où.</p>
        <button className="px-6 mt-6 md:mb-52 py-2 bg-gradient-to-r from-[#39BCC5] to-[#8084C0] font-sans font-semibold text-xl text-white rounded-full"><a href="https://connect2card.com/demande">
            S'inscrire</a>
          </button>
  </div>
  <div className="w-full md:w-2/5 flex justify-end mt-6 md:mt-0">
    <img src={image2} alt="Large Example" className="hidden md:block w-full h-auto object-cover" />
  </div>
</section>

<section id="section5" className="flex flex-col md:flex-row mt-20 mb-6 p-6 items-start">  
  <div className="w-full md:w-1/3 flex justify-start">
    <img src={image3} alt="Large Example" className="hidden md:block w-full  h-auto object-cover" />
  </div>

  <div className="w-full md:w-1/3 md:ml-20 md:p-6 mb-20 md:flex md:flex-col justify-center">
    <h2 className="text-4xl font-bold mb-6">Infos</h2>
    <form className="md:flex ml-5 md:flex-col grid grid-cols-1 space-y-4">
      <div>
        <label htmlFor="name" className="block text-lg font-medium mb-2">Nom <span className='text-red-600'>*</span> </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setNom(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-lg font-medium mb-2">Téléphone <span className='text-red-600'>*</span></label>
        <input
          type="tel"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-lg font-medium mb-2">Message<span className='text-red-600'>*</span></label>
        <textarea
          id="message"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows="4"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="self-start px-6 py-2 bg-gradient-to-r from-[#39BCC5] to-[#8084C0] font-semibold text-white rounded-full"
      >
        Envoyer
      </button>
    </form>
  </div>
</section>


      <div className="absolute bottom-0 mb-8 w-10/12">
        <BasDePage />
      </div>
    </div>
    </div>
  );
}

export default Home;
