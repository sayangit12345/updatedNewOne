import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class MyProfile extends Component {
  state = {myProfileList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMyProfileDetails()
  }

  onClickRetryJobs = () => {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/my-profile`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = {
        id: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        userBio: data.profile.user_bio,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        stories: data.profile.stories,
      }
      this.setState({
        myProfileList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderStories = () => {
    const {myProfileList} = this.state
    const {stories} = myProfileList
    return (
      <ul className="myprofile-stories-container">
        {stories.map(eachItem => (
          <li key={eachItem.id}>
            <img
              src={eachItem.image}
              alt="profile-stories-icon"
              className="myprofile-stories-image"
            />
          </li>
        ))}
      </ul>
    )
  }

  renderPosts = () => {
    const {myProfileList} = this.state
    const {posts} = myProfileList
    return (
      <div>
        <ul className="myprofile-posts-container">
          {posts.map(eachItem => (
            <li key={eachItem.id}>
              <img
                src={eachItem.image}
                alt="myprofile-posts-icon"
                className="myprofile-posts-image"
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://res.cloudinary.com/duiooro44/image/upload/v1700650204/Group_7522_e4pfyc.png"
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

  noPostView = () => (
    <div className="no-post-view-container">
      <BiCamera />
      <h1 className="no-post-view-heading">No Posts Yet</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderProfileDetailsView = () => {
    const {myProfileList} = this.state
    const {
      userId,
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      postsCount,
      posts,
      stories,
    } = myProfileList

    return (
      <div className="all-myprofile-container">
        <div className="myprofile-details-container">
          <img
            src={profilePic}
            alt="myprofile-icon"
            className="myprofile-image"
          />
          <div className="myprofile-header-followers-container">
            <h1 className="myprofile-name">{userName}</h1>
            <div className="myprofile-followers-container">
              <p className="myprofile-followers">
                {postsCount} <span className="span-element"> posts</span>
              </p>
              <p className="myprofile-followers">
                {followersCount}
                <span className="span-element"> followers</span>
              </p>
              <p className="myprofile-followers">
                {followingCount}
                <span className="span-element"> followings</span>
              </p>
            </div>
            <p className="myprofile-user-id">{userId}</p>
            <p className="myprofile-user-id">{userBio}</p>
          </div>
        </div>
        {stories === undefined ? this.noPostView() : this.renderStories()}
        <hr className="hr-line" />
        <div className="post-image-container">
          <BsGrid3X3 />
          <h1 className="myprofile-posts-users-heading">Posts</h1>
        </div>
        {posts === undefined ? this.noPostView() : this.renderPosts()}
      </div>
    )
  }

  renderMyProfileView = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderMyProfileView()}
      </div>
    )
  }
}
export default MyProfile
