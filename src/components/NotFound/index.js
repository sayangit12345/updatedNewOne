import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/duiooro44/image/upload/v1700475070/erroring_1_lpcgob.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button type="button" className="home-page-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
