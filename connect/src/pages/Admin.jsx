import API_URL from "../config";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
  import 'react-toastify/dist/ReactToastify.css';
  import {jwtDecode} from "jwt-decode";
  import ProtectedRoute from "../components/ProtectedRoutes";
  import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/Loading";




const Admin = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [demandePerPage, setDemandePerPage] = useState(6);
  const [loading, setLoading] = useState(true);


  const getStatusClasses = (status) => {
    const statusClasses = {
      approved: {
        bg: 'bg-green-100 dark:bg-green-900',
        text: 'text-green-800 dark:text-green-300',
        svg: 'M5 11.917L9.724 16.5 19 7.5'
      },
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900',
        text: 'text-yellow-800 dark:text-yellow-300',
        svg: 'M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z'
      },
      rejected: {
        bg: 'bg-red-100 dark:bg-red-900',
        text: 'text-red-800 dark:text-red-300',
        svg: 'M6 18 17.94 6M18 18 6.06 6'
      }
    };
  
    return statusClasses[status] || {};
  };


  useEffect(() => {
      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'Admin') {
          navigate("/");
      }
      console.log(userRole)
    const getDemandes = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/demandes`);
          setDemandes(response.data);
          console.log(demandes)
          setLoading(false)
        } catch (error) {
          console.error('Erreur lors de la récupération des demandes :', error);
          toast.error('Erreur lors de la récupération des demandes');
        }
      };
  
    
    getDemandes();
  }, [navigate]);


  const lastDemandeIndex = currentPage * demandePerPage;
  const firstDemandeIndex = lastDemandeIndex - demandePerPage;  
  const currentDemande = demandes.slice(firstDemandeIndex, lastDemandeIndex);
  const totalDemandes = demandes.length;
  const totalPagePerDemande = Math.ceil(totalDemandes / demandePerPage);



  //route
  const logoutUser = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate("/login"); // Naviguer vers la page d'historique
    }, 1000);
    toast.error("Votre session a expiré. Veuillez vous reconnecter.");
  };

  const handleApprove = async (demandeId) => {
    try {
      await axios.post(`${API_URL}/api/demandes/${demandeId}/approve`);
      toast.success('Demande approuvée avec succès!');
      // Met à jour l'état des demandes localement
      setDemandes(demandes.map(demande =>
        demande._id === demandeId ? { ...demande, status: 'approved' } : demande
      ));
    } catch (error) {
      console.error('Erreur lors de l\'approbation de la demande :', error);
      toast.error('Erreur lors de l\'approbation de la demande');
    }
  };

  const handleReject = async (demandeId) => {
    try {
      await axios.post(`${API_URL}/api/demandes/${demandeId}/reject`);
      toast.success('Demande rejetée avec succès!');
      // Met à jour l'état des demandes localement
      setDemandes(demandes.map(demande =>
        demande._id === demandeId ? { ...demande, status: 'rejected' } : demande
      ));
    } catch (error) {
      console.error('Erreur lors du rejet de la demande :', error);
      toast.error('Erreur lors du rejet de la demande');
    }
  };
  if (loading) {
    return <Loading />;
  }
    return (
        <>
    <ProtectedRoute>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Liste de demandes</h2>
              <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <div>
                  <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Selectionnez le type de demande</label>
                  <select id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option defaultValue>Toutes les demandes</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <span className="inline-block text-gray-500 dark:text-gray-400"> from </span>
                <div>
                  <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Selectionnez une periode</label>
                  <select id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option defaultValue>Cette semaine</option>
                    <option value="this month">ce mois</option>
                    <option value="last 3 months">3 derniers mois</option>
                    <option value="last 6 months">6 derniers mois</option>
                    <option value="this year">cette année</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentDemande.map((demande) => {
                  const { bg, text, svg } = getStatusClasses(demande.status);

                  return (
                    <div className="flex flex-wrap items-center gap-y-4 py-6" key={demande._id}>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Pseudo</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <a href="#" className="hover:underline">{demande.userName}</a>
                        </dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{demande.date}</dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Téléphone</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{demande.phoneNumber}</dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status</dt>
                        <dd className={`me-2 mt-1.5 inline-flex items-center rounded ${bg} px-2.5 py-0.5 text-xs font-medium ${text}`}>
                          <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={svg} />
                          </svg>
                          {demande.status === 'approved' ? 'Approved' : demande.status === 'pending' ? 'Pending' : 'Rejected'}
                        </dd>
                      </dl>
                      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                        <button type="button" onClick={() => handleApprove(demande._id)} className="w-full rounded-lg border border-green-500 px-3 py-2 text-center text-sm font-medium text-green-500 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-600 dark:text-green-600 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-900 lg:w-auto">Valider la demande</button>
                        <button type="button" onClick={() => handleReject(demande._id)} className="w-full rounded-lg border border-red-400 px-3 py-2 text-center text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-600 dark:text-red-600 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Rejeter la demande</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <nav className="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
              {currentDemande && currentDemande.length > 0 ? (
                <Pagination
                  totalDemandes={totalDemandes}
                  demandePerPage={demandePerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              ) : (
                <p></p>
              )}
            </nav>
          </div>
        </div>
      </section>
    </ProtectedRoute>


        </>
      )
}

export default Admin;