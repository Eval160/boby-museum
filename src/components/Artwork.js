import { useState, useEffect } from 'react';
import logo from '../logo_boby_museum.png';
import './Artwork.css';

function Artwork({ artworkIds }) {
  const [artworkData, setArtworkData] = useState(null);
  const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"

  useEffect(() => {
    if (artworkIds.length > 0) {
      // Choisis un ID au hasard de la liste d'IDs
      const randomId = artworkIds[Math.floor(Math.random() * artworkIds.length)];

      // Effectuer la deuxième requête pour récupérer les informations de l'œuvre
      fetch(`${baseUrl}${randomId}`)
        .then(response => response.json())
        .then(data => {
          setArtworkData(data); // Mettre à jour l'état avec les données de l'API
        })
        .catch(error => {
          console.error('Erreur lors de la requête API pour les détails de l\'œuvre :', error);
        });
    }
  }, [artworkIds]);
  return (
    <div className="artwork">
       {artworkData && (
        <div className="artwork">
          <h2>{artworkData.title}</h2>
          <img src={artworkData.primaryImageSmall} alt={artworkData.title} width="400" height="400" />
          <div className="artwork-form">
            <input type="text" />
            <button type="button">Go</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Artwork;
