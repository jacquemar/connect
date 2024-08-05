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

function Accueil() {

    const [activeSection, setActiveSection] = useState(0);

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

  return (
    <div className="relative min-h-screen">
      <Header activeSection={activeSection} scrollToSection={scrollToSection}/>
      <div className="fixed top-1/2 transform -translate-y-1/2 right-8">
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
      <section id="section1" className="flex flex-col md:flex-row mt-20 items-center justify-between p-6">
        <div className="w-full md:w-2/4 flex justify-end">
          <img src={image1} alt="Example" className="w-2/3 h-auto object-cover ml-auto" />
        </div>
        <div className="w-full md:w-2/4 flex flex-col items-start p-6 mt-[-6rem]">
          <img src={futurSvg} alt="SVG Example" className="w-3/4 h-auto -ml-5" />
          <p className="mt-4 text-3xl mb-6 text-left">
            Découvrez <span className="font-extrabold">CONNECT</span>, la révolution <br />
            du networking. Partagez en un seul geste, <br />
            mettez à jour et personnalisez facilement <br />
            votre profil
          </p>
          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#39BCC5] to-[#8084C0] font-sans font-semibold text-xl text-white rounded-full">
            S'inscrire
          </button>
        </div>
      </section>
      <section
      id="section2"
        className="flex -mt-6 flex-col justify-center items-start p-6 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: '500px'
        }}
      >
        <div className="ml-24 mt-44 max-w-md">
          <img src={textInterface} alt='interface'  className="mt-40 mb-10"/>
          <p className="text-2xl ml-8 mt-44 font-sans font-semibold text-black mb-20">
          Personnalisez <br />
          facilement votre profil..
          </p>
          <button className="px-6 mt-44 mb-52 ml-4 py-2 bg-gradient-to-r from-[#39BCC5] to-[#8084C0] font-sans font-semibold text-xl text-white rounded-full">
            Découvrir
          </button>
        </div>
      </section>
      <section id="section3" className="p-6 flex flex-col items-start">

        <div className="w-full mt-20 ml-36 flex justify-start mb-20">
            <img src={match} alt="SVG Example" className="w-1/3 h-auto" />
        </div>

        <div className="w-full mb-32 flex justify-around">
            <img src={networking} alt="networking" className="w-1/4 h-auto" />
            <img src={salonPro} alt="salon pro" className="w-1/4 h-auto" />
            <img src={BtoB} alt="btob" className="w-1/4 h-auto" />
        </div>
      </section>
      <section id="section4" className="p-6 flex flex-col md:flex-row items-start">
  
  <div className="w-full md:w-2/5 mt-16 flex ml-24 flex-col items-start">
    <img src={nosOffres} alt="SVG Example" className="w-1/2  h-auto mb-4" />
    
    
    <div className="grid grid-cols-2 mb-28 gap-4 w-full">
      <img src={offreBronze} alt="offre bronze" className="w-full h-auto" />
      <img src={offreArgent} alt="offre argent" className="w-full h-auto" />
      <img src={offreOr} alt="offre or" className="w-full h-auto" />
      <img src={offrePlatinium} alt="offre platinium" className="w-full h-auto" />
    </div>
  </div>

  
  <div className="w-full md:w-2/5 flex mt-40 flex-col items-start md:ml-8">
    <h2 className="text-4xl uppercase font-extrabold mb-4">Supports <br />
        en parfaite <br />
        symbiose</h2>
    <p className="text-xl font-medium">Personnalisez-la selon <br />
        vos besoins pour une <br />présentation professionnelle <br />
        et unique.</p> 
    <p className='text-xl font-medium pt-3'>Profitez également de <br /> notre application web <br /> intuitive, <br />facilement accessible depuis n'importe où.</p>
        <button className="px-6 mt-6 mb-52 py-2 bg-gradient-to-r from-[#39BCC5] to-[#8084C0] font-sans font-semibold text-xl text-white rounded-full">
            S'inscrire
          </button>
  </div>
  <div className="w-full md:w-2/5 flex justify-end mt-6 md:mt-0">
    <img src={image2} alt="Large Example" className="w-full h-auto object-cover" />
  </div>
</section>
<section id="section5" className="flex flex-col md:flex-row mt-20 p-6 items-start">
  {/* Grande image à gauche */}
  <div className="w-full md:w-1/3 flex justify-start">
    <img src={image3} alt="Large Example" className="w-full h-auto object-cover" />
  </div>

  {/* Formulaire à droite */}
  <div className="w-full md:w-1/3 ml-20 p-6 flex flex-col justify-center">
    <h2 className="text-4xl font-bold mb-6">Infos</h2>
    <form className="flex flex-col space-y-4">
      <div>
        <label htmlFor="name" className="block text-lg font-medium mb-2">Nom <span className='text-red-600'>*</span> </label>
        <input
          type="text"
          id="name"
          name="name"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-lg font-medium mb-2">Message<span className='text-red-600'>*</span></label>
        <textarea
          id="message"
          name="message"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows="4"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="self-start px-6 py-2 bg-gradient-to-r from-[#39BCC5] to-[#8084C0] font-semibold text-white rounded-full"
      >
        Envoyer
      </button>
    </form>
  </div>
</section>


      <div className="absolute bottom-0 mb-8 w-full">
        <BasDePage />
      </div>
    </div>
  );
}

export default Accueil;
