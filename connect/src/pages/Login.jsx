import { useState } from "react";
import logoColor from "../assets/icons/COLOR-LOGO-CONNECT.svg";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
 
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le formulaire de se soumettre normalement
  
    try {
      // Effectuer une requête HTTP POST vers backend
      const response = await axios.post('http://localhost:3000/api/login', { userName, password });
      localStorage.setItem('token', response.data.token);
  
      // Récupérer les informations de l'utilisateur
      const userResponse = await axios.get('http://localhost:3000/api/user', {
        headers: {
          Authorization: `Bearer ${response.data.token}` // Inclure le token JWT dans l'en-tête de la requête
        }
      });
  
      // Sauvegarder le rôle de l'utilisateur dans le stockage local
      localStorage.setItem('userRole', userResponse.data.role);
  
      // Si la requête est réussie, affichez un message de succès
      toast.success('Connexion réussie');
  
      setTimeout(() => {
        navigate("/dashboard"); // Naviguer vers la page d'historique
      }, 4000);
  
    } catch (error) {
      // En cas d'erreur, affichez un message d'erreur
      toast.error('Nom d\'utilisateur ou mot de passe incorrect');
      console.error('Erreur lors de la connexion :', error);
    }
  };
  
  
    return (
        <>
          
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <ToastContainer/>
              <img
                className="mx-auto h-16 w-auto"
                src={logoColor}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Connexion
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" method="POST">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                    Nom utilisateur
                  </label>
                  <div className="mt-2">
                    <input
                      id="userName"
                      name="userName"
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                      autoComplete="Nam d'utilisateur"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Mot de passe
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-cyan-600 hover:text-green-400">
                        Mot de passe oublié ?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-cyan-600 to-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Se connecter
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Pas encore membre ?
                <a href="/" className="font-semibold leading-6 text-green-400 hover:text-cyan-600">
                  Rejoignez-nous
                </a>
              </p>
            </div>
          </div>
        </>
      )
}

export default Login;