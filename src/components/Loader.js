import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import "./Loader.css"

function Loader() {
  return (
    <div className="loading-wrapper">
      <div className="loading-message">
        <FontAwesomeIcon icon={faSpinner} size="2xl" spin />
        <span>Chargement en cours...</span>
      </div>
    </div>
  )
}

export default Loader
