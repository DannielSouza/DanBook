import React from "react";
import style from "../styles/CommentInput.module.css";
import sendIcon from "../images/send.png";
import axios from 'axios'

const CommentInput = ({postId, setAttComment}) => {
  const [loading, setLoading] = React.useState(false);
  const [comment, setComment] = React.useState("")
  const token = JSON.parse(window.localStorage.getItem('token'))

  async function createComment(event) {
    if(!loading){
      event.preventDefault();
      setLoading(true)
      try {
        await axios
          .post(`http://localhost:4000/post//comment/${postId}`, {comment:comment}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setAttComment((prev)=> prev+1)
          setComment("")
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
  }

  return (
    <div className={style.commentInputContainer}>
      <textarea
        placeholder="Escreva seu comentário"
        maxLength="37"
        className={style.commentInput}
        value={comment}
        onChange={({target})=> setComment(target.value)}
      />
      <button onClick={createComment} className={style.commentbutton}>
        <img
          src={sendIcon}
          className={style.commentbuttonIcon}
          alt="enviar comentário"
        />
      </button>
    </div>
  );
};

export default CommentInput;
