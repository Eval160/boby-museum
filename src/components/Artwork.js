import logo from '../logo_boby_museum.png';
import './Artwork.css';

function Artwork() {

  return (
    <div className="artwork">
      <h1>Lorem ipsum</h1>
      <img src={logo} className="App-logo" alt="logo" width="400" height="400" />
      <div className="artwork-form">
        <input type="text" />
        <button type="button">Go</button>
      </div>
    </div>
  );
}

export default Artwork;
