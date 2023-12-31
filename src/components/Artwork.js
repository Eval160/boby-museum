import { useState, useEffect } from 'react';
import './Artwork.css';
import AnswerFeedback from './AnswerFeedback';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Artwork({ artworkId, onAnswerSubmitted }) {
  const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
  const [artworkData, setArtworkData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [userAnswerIsCorrect, setUserAnswerIsCorrect] = useState(null);
  const [differenceFromCorrectDate, setDifferenceFromCorrectDate] = useState(0); // Renommé pour indiquer la différence
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArtworkData();
  }, [artworkId]);

  const fetchArtworkData = () => {
    fetch(`${baseUrl}${artworkId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur lors de la requête API pour les détails de l'oeuvre");
          }
          return response.json();
        })
        .then(data => {
          console.log(data.objectEndDate);
          setArtworkData(data);
        })
        .catch(error => {
          setError(error.message);
        })

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

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleAnswerSubmitted();
    } else {
      setUserAnswer(e.target.value)
    }
  };

  const handleAnswerSubmitted = () => {
    checkUserAnswer();
    setAnswerSubmitted(true)
  }

  const handleNextArtwork = () => {
    setAnswerSubmitted(false);
    onAnswerSubmitted();
  }

  return (
    <>
       { error ? (
        <div className="error-message">{error}</div>
       ) : (
        artworkData && (
        <>
          <div className="artWorkWrapper">
            <h2>{artworkData.title}</h2>
            <img src={artworkData.primaryImageSmall}
                 alt={artworkData.title}
                 height="300"
                  />
          </div>
          { answerSubmitted ? (
            <>
              <AnswerFeedback isCorrect={userAnswerIsCorrect} difference={differenceFromCorrectDate}/>
              <button onClick={handleNextArtwork}
                      className="btn">
                <FontAwesomeIcon icon={faChevronLeft} />  Rejouer avec une nouvelle image
              </button>
            </>
          ) : (
            <div className="artwork-form">
              <input type="number"
                     onKeyUp={handleKeyUp}
                     placeholder="Année de création ..."/>
              <button type="button"
                      className="btn"
                      onClick={handleAnswerSubmitted}>Go</button>
            </div>
          ) }
        </>
      ))}
    </>
  );
}

export default Artwork;
