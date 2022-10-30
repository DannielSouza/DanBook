import React from "react";
import style from "../styles/PostItem.module.css";
import axios from "axios";
import defaultPicture from "../images/defaultUser.png";
import { Link } from "react-router-dom";
import PostModalInfo from "./PostModalInfo";
import PostProfilePicture from "./PostProfilePicture";
import PostProfileConfig from "./PostProfileConfig";

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
  token,
  navigateIntoProfiles,
  viewPostDetails,
  attComment,
  profileOptions
}) => {
  const formatedDateComplete = date.split("T")[0].split("-");
  const formatedDate = `${formatedDateComplete[2]}/${formatedDateComplete[1]}/${formatedDateComplete[0]}`;
  const postIdString = String(postId);
  const [likesCount, setLikesCount] = React.useState(likes.length);
  const [commentsCount, setCommentsCount] = React.useState(comments.length);
  const [likedPost, setLikedPost] = React.useState(false);
  const [likeButtonMessage, setLikeButtonMessage] = React.useState("Gostei");
  const [styleLikedButton, setStyleLikedButton] = React.useState({});
  const [modalInfo, setModalInfo] = React.useState(false);
  const [checkIfUptdateCommentCount, setCheckIfUptdateCommentCount] = React.useState(1)

  React.useEffect(() => {
    likes.forEach((usersLikes) => {
      if (String(usersLikes._id) === String(userId)) {
        setLikedPost(true);
        setLikeButtonMessage("Você gostou!");
        setStyleLikedButton({ backgroundColor: "#9442fe", color: "white" });
      }
    });
  }, []);


  React.useEffect((setUpdatePosts)=>{
    setCheckIfUptdateCommentCount((prev)=>prev+1)
    if(checkIfUptdateCommentCount >= 3){
      setCommentsCount(commentsCount + 1)
    }
  },[attComment])


  async function likeAPost() {
    try {
      await axios.post("http://localhost:4000/post/like/" + postIdString, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikesCount(likesCount + 1);
      setLikedPost(true);
      setLikeButtonMessage("Você gostou!");
      setStyleLikedButton({ backgroundColor: "#9442fe", color: "white" });
    } catch (error) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }

  function openPostInfo() {
    if (viewPostDetails) {
      setModalInfo(true);
    }
  }

  return (
    <>
      {modalInfo && (
        <PostModalInfo
          postId={postId}
          userId={userId}
          viewPostDetails={false}
          setModalInfo={setModalInfo}
        />
      )}
      <div className={image? style.postContainer : style.postContainerNoImage}>
        <div className={style.contentContainer}>

          <PostProfilePicture picture={picture} />

            <div>
              <div className={style.contentInfo}>
                {navigateIntoProfiles && userId === ownersPostId && (
                  <Link className={style.postUser} to={`/profile`}>
                    <p>{name}</p>
                  </Link>
                )}
                {navigateIntoProfiles && userId !== ownersPostId && (
                  <Link
                    className={style.postUser}
                    to={`/profile/${ownersPostId}`}
                  >
                    <p>{name}</p>
                  </Link>
                )}
                {!navigateIntoProfiles && (
                  <li className={style.postUser}>
                    <p>{name}</p>
                  </li>
                )}

                <span>{formatedDate}</span>
              </div>

          </div>


              {profileOptions && <PostProfileConfig  image={image} content={content} postId={postId} />}
        </div>
        <p
          onClick={openPostInfo}
          style={
            viewPostDetails ? { cursor: "pointer" } : { cursor: "default" }
          }
          className={style.postContent}
        >
          {content}
        </p>

        {image && (
          <div
            onClick={openPostInfo}
            style={
              viewPostDetails ? { cursor: "pointer" } : { cursor: "default" }
            }
            className={style.postImageContainer}
          >
            <img
              className={style.postImage}
              src={`http://localhost:4000/images/posts/${image}`}
              alt="imagem da publicação"
            />
          </div>
        )}

        <div
          style={
            viewPostDetails ? { cursor: "pointer" } : { cursor: "default" }
          }
          className={style.reactionsInfoContainer}
        >
          <p onClick={openPostInfo}>
            {likesCount === 1
              ? likesCount + " curtida"
              : likesCount + " curtidas"}
          </p>
          <p onClick={openPostInfo}>
            {commentsCount === 1
              ? commentsCount + " comentário"
              : commentsCount + " comentários"}
          </p>
        </div>

        <div className={style.reactionsContainer}>
          {likedPost ? (
            <button style={styleLikedButton} onClick={likeAPost}>
              {likeButtonMessage}
            </button>
          ) : (
            <button onClick={likeAPost}>Gostei</button>
          )}
          <button onClick={openPostInfo}>Comentar</button>
        </div>
      </div>
    </>
  );
};

export default PostItem;
