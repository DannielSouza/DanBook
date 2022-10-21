import React from 'react'
import defaultPicture from "../images/defaultUser.png";
import style from '../styles/PostProfilePicture.module.css'

const PostProfilePicture = ({picture}) => {
  return (
    <div
            className={style.profilePicture}
            style={
              picture !== ""
                ? {
                    backgroundImage: `url(http://localhost:4000/images/users/${picture})`,
                  }
                : { backgroundImage: `url(${defaultPicture})` }
            }
          ></div>
  )
}

export default PostProfilePicture