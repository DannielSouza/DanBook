import React from "react";
import style from "../styles/PostItem.module.css";
import axios from "axios";
import defaultPicture from '../images/defaultUser.png'
import { Link } from "react-router-dom";


const PostItem = ({
  image,
  content,
  likes,
  comments,
  postId,
  userId,
  picture,
  name,
  date,
  setAlert,
  ownersPostId,
  token
}) => {
  const formatedDateComplete = date.split("T")[0].split("-");
  const formatedDate = `${formatedDateComplete[2]}/${formatedDateComplete[1]}/${formatedDateComplete[0]}`;
  const postIdString = String(postId);
  const [likesCount, setLikesCount] = React.useState(likes.length);
  const [commentsCount, setCommentsCount] = React.useState(comments.length);
  const [likedPost, setLikedPost] = React.useState(false);
  const [likeButtonMessage, setLikeButtonMessage] = React.useState("Gostei");
  const [styleLikedButton, setStyleLikedButton] = React.useState({})

  React.useEffect(() => {
    
    
    likes.forEach((usersLikes) => {
      if (String(usersLikes._id) === String(userId)) {
        setLikedPost(true);
        setLikeButtonMessage("Você gostou!");
        setStyleLikedButton({backgroundColor: '#9442fe', color: 'white'})
      }
    });
  }, []);

  async function likeAPost() {
    try {
      await axios.post("http://localhost:4000/post/like/" + postIdString, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikesCount(likesCount + 1);
      setLikedPost(true)
      setLikeButtonMessage("Você gostou!");
      setStyleLikedButton({backgroundColor: '#9442fe', color: 'white'})
    } catch (error) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }

  return (
    <>
      <div className={style.postContainer}>
        <div className={style.contentContainer}>
          <div
            style={picture ?{ backgroundImage: `url(http://localhost:4000/images/users/${picture})`}:
            { backgroundImage: `url(${defaultPicture})`}
          }
            className={style.profilePicture}
          ></div>
          <div>
            <div className={style.contentInfo}>
              <Link className={style.postUser} to={`/profile/${ownersPostId}`}><p>{name}</p></Link>
              <span>{formatedDate}</span>
            </div>
          </div>
        </div>
            <p className={style.postContent}>{content}</p>

        {image && (
          <img
            className={style.postImage}
            src={`http://localhost:4000/images/posts/${image}`}
            alt="imagem da publicação"
          />
        )}

        <div className={style.reactionsInfoContainer}>
          <p>
            {likesCount === 1
              ? likesCount + " curtida"
              : likesCount + " curtidas"}
          </p>
          <p>
            {commentsCount === 1
              ? commentsCount + " comentário"
              : commentsCount + " comentários"}
          </p>
        </div>

        <div className={style.reactionsContainer}>
          {likedPost ? (
            <button style={styleLikedButton} onClick={likeAPost}>{likeButtonMessage}</button>
          ) : (
            <button onClick={likeAPost}>Gostei</button>
          )}
          <button>Comentar</button>
        </div>
      </div>
    </>
  );
};

export default PostItem;
