import logoColor from "../assets/icons/COLOR-LOGO-CONNECT.svg";
import { useNavigate } from "react-router-dom";
import API_URL from "../config"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Demande = () => {

    const [userName, setUsername] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        // setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/create-demande`, {
              userName: userName,
              email: email,
              nom: nom,
              prenom: prenom,
              phoneNumber: phoneNumber,
            });
      
            if (response.ok) {
              toast.success("Utilisateurs ajouté avec succès ! ");
              setUsername("");
      setEmail("");
      setPassword("");
              setTimeout(() => {
                navigate("/login"); // Naviguer vers la page de connexion
              }, 2000);
            } else {
              // Gestion des erreurs si nécessaire
            }
          } catch (error) {
            if (error.response) {
              // L'erreur provient de la réponse HTTP du serveur
              toast.error(error.response.data.error);
            } else {
              // Une autre erreur s'est produite
              toast.error("Une erreur est survenue lors de l'ajout de l'utilisateur !");
            }}
    };
    return (
        <>
          
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <ToastContainer />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-16 w-auto"
                src={logoColor}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Demande de compte
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form encType="multipart/formd-ata" className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Adresse Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Pseudo
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="name"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Nom
                  </label>
                  <div className="mt-2">
                    <input
                      id="nom"
                      name="nom"
                      type="name"
                      onChange={(e) => setNom(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Prenom
                  </label>
                  <div className="mt-2">
                    <input
                      id="prenom"
                      name="prenom"
                      type="name"
                      onChange={(e) => setPrenom(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Numéro de téléphone
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="name"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-cyan-600 to-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Senregistrer
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Déjà membre ?
                <a href="#" className="font-semibold gap-1 leading-6 text-green-400 hover:text-cyan-600">
                  Connectez-nous
                </a>
              </p>
            </div>
          </div>
        </>
      )
}

export default Demande;