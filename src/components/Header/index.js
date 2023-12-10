import './index.css'
import {BsSearch} from 'react-icons/bs'
import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'

const Header = props => {
  const [search, setSearch] = useState('')

  const {searchInputValue} = props
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onChangeSearchInput = event => {
    setSearch(event.target.value)
  }

  const onClickButton = () => {
    searchInputValue(search)
  }

  return (
    <div className="navbar-container">
      <Link to="/" className="nav-link">
        <img
          src="https://res.cloudinary.com/duiooro44/image/upload/v1700302694/Group_xrznwq.png"
          alt="website logo"
          className="header-image"
        />
        <p className="navbar-heading">Insta Share</p>
      </Link>
      <ul className="navbar-option-container">
        <li>
          <div className="search-input-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search Caption"
              onChange={onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={onClickButton}
              aria-label="search"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        </li>
        <li>
          <Link to="/" className="nav-link-lg">
            Home
          </Link>
        </li>
        <li>
          <Link to="/my-profile" className="nav-link-lg">
            Profile
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogOut}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
