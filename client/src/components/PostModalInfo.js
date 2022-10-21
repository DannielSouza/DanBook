import React from "react";
import style from "../styles/PostModalInfo.module.css";
import Loading from "./Loading";
import axios from "axios";
import PostItem from "../components/PostItem";
import AlertMessage from "./AlertMessage";
import CommentItem from "./CommentItem";

const PostModalInfo = ({ postId, userId, viewPostDetails, setModalInfo }) => {
  const [dataPost, setDataPost] = React.useState();
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [alert, setAlert] = React.useState(false);

  React.useEffect(() => {
    async function getPostDetails() {
      await axios
        .get("http://localhost:4000/post/" + postId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setDataPost(data));
    }
    getPostDetails();
  }, []);


  function getClick({target}){
    if(target.className === 'PostModalInfo_container__Evv0Y') setModalInfo(false)
  }

  if (dataPost && dataPost.image === "")
    return (
      <section onClick={getClick} className={style.container}>
        {alert && <AlertMessage message={"Houve algum erro."} />}


        <div className={style.contentContainer}>
          <PostItem
            setAlert={setAlert}
            userId={userId}
            key={dataPost._id}
            date={dataPost.createdAt}
            ownersPostId={dataPost._id}
            name={dataPost.userName}
            picture={dataPost.userImage}
            postId={dataPost._id}
            image={dataPost.image}
            content={dataPost.content}
            likes={dataPost.likes}
            comments={dataPost.comments}
            navigateIntoProfiles={false}
            viewPostDetails={viewPostDetails}
          />

          <div className={style.commentsContainerNoPicture}>

            {dataPost.comments ? dataPost.comments.map((comment)=>{
              return <CommentItem />
            })
          :
          <h1>Sem comentários</h1>
          }

          </div>


        </div>
      </section>
    );
  if (dataPost && dataPost.image !== "")
    return (
      <section onClick={getClick} className={style.container}>
        <div className={style.contentContainer}>
          <PostItem
            setAlert={setAlert}
            userId={userId}
            key={dataPost._id}
            date={dataPost.createdAt}
            ownersPostId={dataPost._id}
            name={dataPost.userName}
            picture={dataPost.userImage}
            postId={dataPost._id}
            image={dataPost.image}
            content={dataPost.content}
            likes={dataPost.likes}
            comments={dataPost.comments}
            navigateIntoProfiles={false}
            viewPostDetails={viewPostDetails}
          />
        </div>
      </section>
    );
  return (
    <section className={style.container}>
      <Loading />
    </section>
  );
};

export default PostModalInfo;
