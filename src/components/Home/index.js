import './index.css'
import {useState} from 'react'
import Header from '../Header'
import UserPosts from '../UserPosts'
import UserStories from '../UserStories'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')

  const searchInputValue = value => {
    setSearchValue(value)
  }

  return (
    <div className="home-container">
      <Header searchInputValue={searchInputValue} />
      <UserStories />
      <UserPosts />
    </div>
  )
}

export default Home
