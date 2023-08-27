import logo from './logo_boby_museum.png';
import './App.css';
import ArtworkContainer from './components/ArtworkContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Boby Museum</h1>
        <img src={logo} className="App-logo" alt="logo" width="200" height="200" />
      </header>
      <ArtworkContainer />
    </div>
  );
}

export default App;
