import logoColor from "../assets/icons/COLOR-LOGO-CONNECT.svg";
import API_URL from "../config"; 
import connectCard from "../assets/telpng.png";
import phone from "../assets/phone.jpg";
import carte from "../assets/carte.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
     <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="https://connect2card.com" className="flex items-center">
                    <img src={logoColor} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"></img>
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Connect</span>
                </a>
                <div className="flex m items-center mt-4 lg:order-2">
                <Link to="/login"> <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Se connecter</a> </Link>
                <Link to="/login">   <a href="#" className="text-white bg-gradient-to-r from-cyan-600 to-green-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Commencer</a></Link> 
                    <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-white rounded bg-green-600 lg:bg-transparent lg:text-green-600 lg:p-0 dark:text-white" aria-current="page">Accueil</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Connexion</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Dashboard</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-5xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">Smart Digital Business Card</h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Entrez dans la nouvelle ère du networking avec CONNECT, la carte de visite sans contact,
                 juste un scan pour partager instantanément tout vos réseaux sociaux, vos adresses geographique, e-mail, et numéro de téléphone partout ou vous passez</p>
                <Link to="/login">  <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-cyan-600 to-green-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Se connecter
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
                </Link>
                
            </div>
            <div className=" lg:mt-0 lg:col-span-5 lg:flex">
                <img src={connectCard} alt="mockup"></img>
            </div>                
        </div>
    </section>

    <section className="bg-gray-50 dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16">
                <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Conçue pour Simplifier</h2>
                <p className="text-gray-500 sm:text-xl dark:text-gray-400">simple, partage du contact instantané, achat en une seule fois et disponibla à vie, eco-friendly, facile à mettre à jour et à customiser
                networking efficace, et sert de page de branding, regroupe tout vos contact business en une place, 6 raisons d'adopter CONNECT.</p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                        <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold dark:text-white">NETWORKING</h3>
                    <p className="text-gray-500 dark:text-gray-400">Carte de visite digitale pour le networking, CONNECT facilite le partage des coordonnées et contacts </p>
                </div>
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
</svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold dark:text-white">Partagez tout</h3>
                    <p className="text-gray-500 dark:text-gray-400">CONNECT vous permet de directement depuis un simple lien de partager votre profil complet</p>
                </div>
                </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">2 Supports en parfaite symbiose </h2>
                <p className="mb-4">La carte imprimée double face avec votre logo ou tout autre visuel presenté à cet effet</p>
                <p>et l'application web, qui vous permet de customiser et mettre à jour votre profil à vie</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <img className="w-full rounded-lg" src={carte} alt="office content 1"></img>
                <img className="mt-4 w-full lg:mt-10 rounded-lg" src={phone} alt="office content 2"></img>
            </div>
        </div>
    </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">Adoptez CONNECT aujourd'hui</h2>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Surpassez les barrières du networking et de la présence en ligne</p>
                <a href="#" className="text-white bg-gradient-to-r from-cyan-600 to-green-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Essayez maintenant</a>
            </div>
        </div>
    </section>

    <footer className="p-4 bg-gray-50 sm:p-6 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-xl">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <a href="https://connect.io" className="flex items-center">
                        <img src={logoColor} className="mr-3 h-8" alt="Connect Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CONNECT</span>
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">

                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Politique de confidentialité</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Termes &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">CONNECT</a>. All Rights Reserved.
                </span>
                <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href="https://www.facebook.com/share/uk6dXQuzDBo9s7XJ/?mibextid=qi2Omg" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 258"><path fill="#455a64" d="M128.534 0c34.098.017 66.102 13.29 90.167 37.383c24.066 24.092 37.312 56.12 37.299 90.174c-.028 69.579-56.076 126.318-125.36 127.446l-2.103.017h-.053c-21.005-.007-41.65-5.194-60.051-15.045l-.86-.466L0 257.233l18.083-66.055C6.93 171.852 1.061 149.922 1.07 127.455C1.098 57.178 58.279 0 128.534 0m.044 21.53c-58.437 0-105.964 47.523-105.987 105.936c-.008 19.712 5.424 38.921 15.719 55.612l.478.769l2.52 4.009l-10.703 39.093l40.097-10.517l3.869 2.294c16.007 9.499 34.32 14.599 53.017 14.764l.905.004h.044c58.392 0 105.918-47.526 105.942-105.943c.01-28.308-10.998-54.927-31.001-74.952c-20.003-20.024-46.603-31.06-74.9-31.07m-45.17 47.063c2.122 0 4.25.02 6.104.115c1.956.096 4.581-.743 7.165 5.466c.992 2.38 2.5 6.057 4.044 9.813l.331.805c2.485 6.045 4.969 12.072 5.447 13.029c.795 1.593 1.325 3.455.264 5.579c-1.06 2.127-1.593 3.454-3.184 5.316c-1.593 1.858-3.344 4.153-4.777 5.579a57.05 57.05 0 0 0-.234.233l-.232.237c-1.42 1.469-2.608 3.153-.93 6.027c1.857 3.19 8.248 13.622 17.716 22.066c12.165 10.85 22.428 14.214 25.613 15.809c3.184 1.594 5.043 1.328 6.9-.8c1.859-2.124 7.961-9.298 10.085-12.487c2.123-3.188 4.246-2.655 7.166-1.593c1.387.505 5.654 2.511 10.092 4.649l1.38.666c4.443 2.15 8.776 4.288 10.29 5.046c3.185 1.595 5.309 2.392 6.104 3.719c.796 1.33.796 7.705-1.858 15.145c-2.653 7.44-15.378 14.23-21.497 15.146c-5.487.818-12.43 1.16-20.06-1.262c-4.624-1.47-10.558-3.429-18.157-6.71c-31.948-13.794-52.815-45.966-54.406-48.09l-.108-.144c-1.941-2.594-12.898-17.445-12.898-32.804c0-15.675 8.229-23.38 11.147-26.569c2.92-3.186 6.37-3.986 8.493-3.986"/></svg>                    </a>

                </div>
            </div>
        </div>
    </footer>
    </div>
  );
}

export default Home;
