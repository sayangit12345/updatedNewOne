import './index.css'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import {useState} from 'react'
import Cookies from 'js-cookie'

const PostItems = props => {
  const [like, setLike] = useState(true)

  const {postItemDetails} = props
  const {
    postId,
    userId,
    userName,
    profilePic,
    postDetails,
    likesCount,
    comments,
    createdAt,
  } = postItemDetails

  const onclickChange = async () => {
    setLike(!like)
    const jwtToken = Cookies.get('jwt_token')
    const likedRequestBody = {
      like_status: like,
    }
    const likedPostUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likedRequestBody),
    }

    const response = await fetch(likedPostUrl, options)
    const fetchedData = await response.json() 
    if (fetchedData.message === 'Post has been liked') {
      setLike(false)
    } else {
      setLike(true)
    }
  }

  return (
    <li className="post-list-items">
      <div className="user-pic-and-name-container">
        <img src={profilePic} alt="user-icon" className="user-image" />
        <Link to={`/users/${userId}`} className="link-user-profile">
          <p className="user-post-name">{userName}</p>
        </Link>
      </div>
      <img src={postDetails.image_url} alt="post-icon" className="posts" />
      <div className="like-comment-share-container">
        {like ? (
          <button
            className="icon-button"
            type="button"
            aria-label="icon-button"
            onClick={onclickChange}
          >
            <BsHeart className="icons" />
          </button>
        ) : (
          <button
            className="icon-button"
            type="button"
            aria-label="icon-button"
            onClick={onclickChange}
          >
            <FcLike className="icons" />
          </button>
        )}
        <FaRegComment className="icons" />
        <BiShareAlt className="icons" />
      </div>
      <div className="all-comments-container">
        {like ? (
          <p className="likes">{likesCount} Likes</p>
        ) : (
          <p className="likes">{likesCount + 1} Likes</p>
        )}
        <p className="captions">{postDetails.caption}</p>
      </div>
      <ul className="comments-container">
        {comments.map(eachMap => (
          <li key={eachMap.user_id}>
            <p className="comments">
              <span className="comment-username">{eachMap.user_name} </span>
              {eachMap.comment}
            </p>
          </li>
        ))}
      </ul>
      <p className="time">{createdAt}</p>
    </li>
  )
}

export default PostItems
