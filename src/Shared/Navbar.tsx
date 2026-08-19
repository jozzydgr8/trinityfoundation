import businessLogo from '../assets/businessLogo.png'
import { FlatButton } from './FlatButton'
import {HeartOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';


export const Navbar = () => {
 

  return (
    <nav className="navbar navbar-expand-lg " data-bs-theme='light' >
      <div className="container-fluid">
        <img className='navbar-brand' src={businessLogo} alt='logo' />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <NavLink to={`/`} className="nav-link active">
                   Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/news`} className="nav-link active">
                    News
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/sendform`} className="nav-link active">
                    volunteer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/donate`} className="nav-link active">
                    donate
              </NavLink>
            </li>
            
           
          </ul>
          <NavLink to={'/donate'}>
            <FlatButton
            title="make a difference"
            className="buttonsuccess"
            
            iconTwo={<HeartOutlined />}
          />
          </NavLink>
        </div>
      </div>
    </nav>
  )
}