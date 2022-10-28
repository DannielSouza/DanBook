import React from 'react'
import PostProfilePicture from './PostProfilePicture'
import style from '../styles/CommentItem.module.css'

const CommentItem = ({comment}) => {
  return (
    <li className={style.commentContainer}>
      <PostProfilePicture  className={style.commentPicture} fromCommentProfile={true} picture={comment.user.image} />
      <div className={style.commentContentContainer}>
        <p>{comment.user.name}</p>
        <span className={style.commentContent}>{comment.comment}</span>
      </div>
    </li>
  )
}

export default CommentItem