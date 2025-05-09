import { NavLink } from 'react-router-dom'
import logo from '../assets/Trinity_logo.png'
function Navbar() {

  return (
  <>
  <nav className="navbar navbar-expand-lg " data-bs-theme="light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">
      <img src={logo} alt='logo'/>
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/trinityfoundation">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/trinityfoundation/news">News</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/trinityfoundation/sendform">Volunteer</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/trinityfoundation/donate">Donate</NavLink>
        </li>
       

      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar