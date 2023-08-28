import logo from '../logo_boby_museum.png';
import './Header.css';

function Header() {
  return (
    <header className="App-header">
      <h1>Boby Museum</h1>
      <img src={logo} className="App-logo" alt="logo" width="150" height="150" />
    </header>
  )
}

export default Header
