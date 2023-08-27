import { useState, useEffect } from 'react';
import './Artwork.css';
import AnswerFeedback from './AnswerFeedback';

function Artwork({ artworkIds }) {
  const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
  const [artworkData, setArtworkData] = useState(null);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [userAnswerIsCorrect, setUserAnswerIsCorrect] = useState(null);
  const [differenceFromCorrectDate, setDifferenceFromCorrectDate] = useState(0); // Renommé pour indiquer la différence


  useEffect(() => {
    // Choisis un ID au hasard lors du chargement initial du composant
    const randomId = artworkIds[Math.floor(Math.random() * artworkIds.length)];
    setSelectedArtworkId(randomId);
  }, [artworkIds]);

  useEffect(() => {
    if (selectedArtworkId !== null) {
      // Effectuer la deuxième requête pour récupérer les informations de l'œuvre
      fetch(`${baseUrl}${selectedArtworkId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.objectEndDate);
          setArtworkData(data); // Mettre à jour l'état avec les données de l'API
        })
        .catch(error => {
          console.error('Erreur lors de la requête API pour les détails de l\'œuvre :', error);
        });
    }
  }, [selectedArtworkId]);

  // const handleNextArtwork = () => {
  //   // Choisir un nouvel ID au hasard et mettre à jour l'état
  //   const randomId = artworkIds[Math.floor(Math.random() * artworkIds.length)];
  //   setSelectedArtworkId(randomId);
  // };

  const checkUserAnswer = () => {
    console.log("Hey!");
    console.log(typeof userAnswer);
    const userAnswerInInt = Number(userAnswer)

    setShowForm(false)
    if (userAnswerInInt === artworkData.objectEndDate) {
      handleCorrectAnswer()
    } else {
      handleIncorrectAnswer(userAnswerInInt)
    }
    setShowAnswerFeedback(true)
  }

  const handleCorrectAnswer = () => {
    setUserAnswerIsCorrect(true)
  }

  const handleIncorrectAnswer = (userAnswerInInt) => {
    setUserAnswerIsCorrect(false)
    const difference = userAnswerInInt - artworkData.objectEndDate
    setDifferenceFromCorrectDate(difference)
  }

  const handleChange = (e) => {
    setUserAnswer(e.target.value)
  }

  return (
    <div>
       {artworkData && (
        <div>
          <div className="artWorkWrapper">
            <h2>{artworkData.title}</h2>
            <img src={artworkData.primaryImageSmall} alt={artworkData.title} width="400" height="400" />
          </div>
          { showForm &&
            <div className="artwork-form">
              <input type="text" onChange={handleChange} />
              <button type="button" onClick={checkUserAnswer}>Go</button>
            </div>
          }

          {
            showAnswerFeedback &&
            <AnswerFeedback isCorrect={userAnswerIsCorrect} difference={differenceFromCorrectDate}/>
          }

        </div>
      )}

      {/* <button onClick={handleNextArtwork}>Changer d'œuvre</button> */}
    </div>
  );
}

export default Artwork;
