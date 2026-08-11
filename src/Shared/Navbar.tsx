import businessLogo from '../assets/businessLogo.png'
import { FlatButton } from './FlatButton'
import {HeartOutlined} from '@ant-design/icons'


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
              <a href={`/`} className="nav-link active">
                   Home
              </a>
            </li>
            <li className="nav-item">
              <a href={`/news`} className="nav-link active">
                    News
              </a>
            </li>
            <li className="nav-item">
              <a href={`/sendform`} className="nav-link active">
                    volunteer
              </a>
            </li>
            <li className="nav-item">
              <a href={`/dontate`} className="nav-link active">
                    donate
              </a>
            </li>
            
           
          </ul>
          <FlatButton
            title="make a difference"
            className="buttonsuccess"
            onClick={() =>
              console.log("Hi, I’d like to get a free consultation...")
            }
            iconTwo={<HeartOutlined />}
          />
        </div>
      </div>
    </nav>
  )
}