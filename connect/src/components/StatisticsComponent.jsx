import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from "../config";

const StatisticsComponent = ({ userName }) => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('week');
  const [totalVisits, setTotalVisits] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${userName}/visits-history?period=${period}`);
        setData(response.data);
        const total = response.data.reduce((sum, item) => sum + item.visits, 0);
        setTotalVisits(total);

        // Calcul du pourcentage de changement
        if (response.data.length > 1) {
          const oldValue = response.data[0].visits;
          const newValue = response.data[response.data.length - 1].visits;
          const change = ((newValue - oldValue) / oldValue) * 100;
          setPercentageChange(change.toFixed(1));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, [userName, period]);

  return (
    <div className="bg-gray-100 shadow-md rounded-3xl p-4 flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-black">Visites sur votre profil</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
      <div className="text-6xl font-bold text-black mb-2">{totalVisits}</div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-black">
          Visite cette {period === 'day' ? 'journée' : period === 'week' ? 'semaine' : period === 'month' ? 'mois' : 'trimestre'}
        </div>
        <div className="flex items-center">
          <span className={`text-sm font-semibold ${parseFloat(percentageChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {percentageChange}%
          </span>
          <svg className={`w-3 h-3 ml-1 ${parseFloat(percentageChange) >= 0 ? 'text-green-400' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={parseFloat(percentageChange) >= 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}></path>
          </svg>
        </div>
      </div>
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className="mt-2 text-sm bg-transparent text-black border-white border rounded px-2 py-1"
      >
        <option value="day">Jour</option>
        <option value="week">Semaine</option>
        <option value="month">Mois</option>
        <option value="quarter">Trimestre</option>
      </select>
    </div>
  );
};

export default StatisticsComponent;