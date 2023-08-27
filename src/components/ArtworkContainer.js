import { useState, useEffect } from 'react';
import Artwork from './Artwork';

function ArtworkContainer() {
  const departementId = 11
  const baseURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departementId}`
  const [artworkIds, setArtworkIds] = useState([]);
  const [randomArtworkId, setRandomArtworkId] = useState(null);

  useEffect(() => {
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        setArtworkIds(data.objectIDs);
        setRandomArtworkId(getRandomArtworkId(data.objectIDs));
      })
      .catch(error => {
        console.error('Erreur lors de la requête API pour les IDs :', error);
      });
  }, []);

  const getRandomArtworkId = (artworkIds) => {
    return artworkIds[Math.floor(Math.random() * artworkIds.length)];
  }

  const handleNextArtwork = () => {
    setRandomArtworkId(getRandomArtworkId(artworkIds));
  };

  return (
    <>{ randomArtworkId &&
      <Artwork artworkId={randomArtworkId}
               onAnswerSubmitted={handleNextArtwork}/>
    }</>
  )
}

export default ArtworkContainer;
