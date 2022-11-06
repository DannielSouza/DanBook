import React from 'react'
import style from '../styles/FollowsModal.module.css'
import PostProfilePicture from './PostProfilePicture'

const FollowsModal = ({followers, setFollowsModal}) => {

  function checkClick({target}){
    if(target.className === 'FollowsModal_container__d1GYL') setFollowsModal(false)
  }

  return (
    <div onClick={checkClick} className={style.container}>
      <div className={style.contentContainer}>
        {followers?
        
        followers.map((follower)=>{
          return <div className={style.followerItem} key={follower._id}>
            <PostProfilePicture picture={follower.image}/>
            <p>{follower.name}</p>
          </div>
        })
        :
        <h1>Sem seguidores</h1>
      }
      </div>
    </div>
  )
}

export default FollowsModal