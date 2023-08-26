import { useState, useEffect } from 'react';

import logo from './logo_boby_museum.png';
import './App.css';
import Artwork from './components/Artwork';

function App() {
  const departementId = 11
  const baseURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departementId}`
  const [artworkIds, setArtworkIds] = useState([]);

  useEffect(() => {
    // Effectuer la première requête pour récupérer la liste d'IDs
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        console.trace()
        setArtworkIds(data.objectIDs); // Mettre à jour l'état avec la liste d'IDs
      })
      .catch(error => {
        console.error('Erreur lors de la requête API pour les IDs :', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Boby Museum</h1>
        <img src={logo} className="App-logo" alt="logo" width="200" height="200" />
      </header>
      <Artwork artworkIds={artworkIds}/>
    </div>
  );
}

export default App;
