import { useState, useEffect } from 'react';
import Artwork from './Artwork';
import Loader from './Loader';

function ArtworkContainer() {
  const departementId = 11
  const baseURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departementId}`
  const [artworkIds, setArtworkIds] = useState([]);
  const [randomArtworkId, setRandomArtworkId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        setArtworkIds(data.objectIDs);
        setRandomArtworkId(getRandomArtworkId(data.objectIDs));
      })
      .catch(error => {
        console.error('Erreur lors de la requête API pour les IDs :', error);
      })
      .finally(() => setIsLoading(false));;
  }, [baseURL]);

  const getRandomArtworkId = (artworkIds) => {
    return artworkIds[Math.floor(Math.random() * artworkIds.length)];
  }

  const handleNextArtwork = () => {
    setRandomArtworkId(getRandomArtworkId(artworkIds));
  };

  return (

    <div>
      {isLoading ? (
          <Loader/>
      ) : (
        randomArtworkId && (
          <Artwork
            artworkId={randomArtworkId}
            onAnswerSubmitted={handleNextArtwork}
          />
        )
      )}
    </div>
  )
}

export default ArtworkContainer;
