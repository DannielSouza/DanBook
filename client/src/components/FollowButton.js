import React from 'react'
import style from '../styles/FollowButton.module.css'
import axios from 'axios'

const FollowButton = ({followers, userId, setUserFollowers}) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const [user, setUser] = React.useState()
  const [isFollowing, setIsFollowing] = React.useState(false)

  React.useEffect(()=>{
    async function getUserAndCheckIfFollow(){
      const response = await axios.get('http://localhost:4000/user/checkuser',{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const user = await response.data
      setUser(user) 
      
      followers.forEach((item)=>{
        if(item.email === user.email) return setIsFollowing(true)
      })
    }
    getUserAndCheckIfFollow()
  },[])
  
  
  async function followUser(){
    try {
      await axios.post(`http://localhost:4000/user/follow/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setUserFollowers(prev=> prev+1)
    setIsFollowing(true)
    } catch (error) {
      
    }
  }


  if(isFollowing) return (
    <button className={style.followButtonDisabled}>Seguindo</button>
  )
  return (
    <button onClick={followUser} className={style.followButton}>Seguir</button>
  )
}

export default FollowButton