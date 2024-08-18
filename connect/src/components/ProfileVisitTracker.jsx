import React, { useEffect } from 'react';
import axios from 'axios';
import API_URL from "../config";

const ProfileVisitTracker = ({ userName }) => {
  useEffect(() => {
    const incrementVisit = async () => {
      try {
        await axios.post(`${API_URL}/api/users/${userName}/increment-visit`);
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la visite:', error);
      }
    };

    incrementVisit();
  }, [userName]);

  return null; // Ce composant ne rend rien visuellement
};

export default ProfileVisitTracker;