import Cookies from 'js-cookie'
import './index.css'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', errormsg: '', showsubmiterror: false}

  onChangeUser = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errormsg: errorMsg, showsubmiterror: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errormsg, showsubmiterror} = this.state

    return (
      <div className="login-page-container">
        <div className="login-page-image-container">
          <img
            src="https://res.cloudinary.com/duiooro44/image/upload/v1700302492/Illustration_oxnh0n.png"
            alt="login-logo"
            className="login-image"
          />
        </div>
        <form
          className="form-container"
          id="loginForm"
          onSubmit={this.onSubmitForm}
        >
          <img
            src="https://res.cloudinary.com/duiooro44/image/upload/v1700302694/Group_xrznwq.png"
            alt="website logo"
            className="website-image"
          />
          <h1 className="login-heading">Insta Share</h1>
          <div className="input-container">
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input-element"
              onChange={this.onChangeUser}
              value={username}
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input-element"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
          {showsubmiterror && <p className="login-description">*{errormsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
