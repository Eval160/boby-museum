import { useState, useEffect } from 'react';
import './Artwork.css';
import AnswerFeedback from './AnswerFeedback';

function Artwork({ artworkId, onAnswerSubmitted }) {
  const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
  const [artworkData, setArtworkData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [userAnswerIsCorrect, setUserAnswerIsCorrect] = useState(null);
  const [differenceFromCorrectDate, setDifferenceFromCorrectDate] = useState(0); // Renommé pour indiquer la différence

  useEffect(() => {
    fetchArtworkData();
  }, [artworkId]);

  const fetchArtworkData = () => {
    fetch(`${baseUrl}${artworkId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.objectEndDate);
          setArtworkData(data);
        })
        .catch(error => {
          console.error('Erreur lors de la requête API pour les détails de l\'œuvre :', error);
        });

  }

  // const handleNextArtwork = () => {
  //   // Choisir un nouvel ID au hasard et mettre à jour l'état
  //   const randomId = artworkIds[Math.floor(Math.random() * artworkIds.length)];
  //   setSelectedArtworkId(randomId);
  // };

  const handleAnswerSubmitted = () => {
    setShowForm(false)
    checkUserAnswer();
    setAnswerSubmitted(true)
  }

  const checkUserAnswer = () => {
    const userAnswerInInt = Number(userAnswer)
    const isCorrect = userAnswerInInt === artworkData.objectEndDate
    setUserAnswerIsCorrect(isCorrect);
    if (!isCorrect) {
      const difference = userAnswerInInt - artworkData.objectEndDate
      setDifferenceFromCorrectDate(difference)
    }
  }

  const handleChange = (e) => {
    setUserAnswer(e.target.value)
  }

  return (
    <>
       {artworkData && (
        <>
          <div className="artWorkWrapper">
            <h2>{artworkData.title}</h2>
            <img src={artworkData.primaryImageSmall} alt={artworkData.title} width="400" height="400" />
          </div>
          { showForm &&
            <div className="artwork-form">
              <input type="text" onChange={handleChange} />
              <button type="button" onClick={handleAnswerSubmitted}>Go</button>
            </div>
          }

          {
            answerSubmitted && (
              <>
                <AnswerFeedback isCorrect={userAnswerIsCorrect} difference={differenceFromCorrectDate}/>
                <button onClick={onAnswerSubmitted}>Changer d'œuvre</button>
              </>
            )

          }
        </>
      )}

    </>
  );
}

export default Artwork;
