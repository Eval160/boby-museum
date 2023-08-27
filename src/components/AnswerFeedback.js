import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function AnswerFeedback({isCorrect, difference}) {
  return (
    <div className="feedback">
      {isCorrect ? (
        <div>
          <FontAwesomeIcon icon={faSquareCheck}
                           size="2xl"
                           style={{color: "#77B255"}} />
          <p>Bravo, vous avez trouvé l'année exacte de création de cette œuvre !</p>
        </div>
      ) : (
        <div>
          <FontAwesomeIcon icon={faXmark}
                           size="2xl"
                           style={{color: "#DD2E44"}} />
          <p>Vous avez estimé cette œuvre avec un écart de {difference > 0 && '+'}{difference} ans</p>
        </div>
      )}
    </div>
  )
}
