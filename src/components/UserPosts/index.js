import Cookies from 'js-cookie'
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PostItems from '../PostItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPosts extends Component {
  state = {postList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserPostData()
  }

  onClickRetryJobs = () => {
    this.getUserPostData()
  }

  getUserPostData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.posts.map(eachItem => ({
        postId: eachItem.post_id,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        profilePic: eachItem.profile_pic,
        postDetails: eachItem.post_details,
        likesCount: eachItem.likes_count,
        comments: eachItem.comments,
        createdAt: eachItem.created_at,
      }))
      this.setState({
        postList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://res.cloudinary.com/duiooro44/image/upload/v1700491821/alert-triangle_avc1ui.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryJobs}
      >
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserDetailsView = () => {
    const {postList} = this.state
    return (
      <ul className="user-posts-list-container">
        {postList.map(eachMap => (
          <PostItems postItemDetails={eachMap} key={eachMap.postId} />
        ))}
      </ul>
    )
  }

  renderUserPosts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderUserPosts()}</>
  }
}

export default UserPosts
