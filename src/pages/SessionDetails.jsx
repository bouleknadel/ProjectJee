import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SessionService from '../services/SessionService'; // Assurez-vous d'importer votre service pour récupérer les données

const SessionDetails = () => {
  const { id } = useParams(); 
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await SessionService.getSessionById(id); // Supposez que vous avez une méthode pour récupérer la session par ID
        setSession(data);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, [id]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Détails de la session</h2>
      <p><strong>ID:</strong> {session.id}</p>
      <p><strong>Type de session:</strong> {session.typeSession}</p>
      <p><strong>Date de début:</strong> {session.dateDebut}</p>
      <p><strong>Date de fin:</strong> {session.dateFin}</p>
      {/* Affichez d'autres informations de la session ici */}
    </div>
  );
};

export default SessionDetails;
