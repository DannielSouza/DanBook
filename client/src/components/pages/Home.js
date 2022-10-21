import React from "react";
import style from "../../styles/Home.module.css";
import axios from "axios";
import Loading from "../Loading";
import PostItem from "../PostItem";
import AlertMessage from "../AlertMessage";
import defaultPicture from "../../images/defaultUser.png";
import { Link } from "react-router-dom";
import CreatePostForm from "../CreatePostForm";

const Home = () => {
  const [token, setToken] = React.useState(
    JSON.parse(localStorage.getItem("token"))
  );
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [updatePosts, setUpdatePosts] = React.useState(1);
  const navigateIntoProfiles = true
  const viewPostDetails = true

  /* GET USER */
  React.useEffect(() => {
    if (token) {
      async function getUser() {
        await axios
          .get("http://localhost:4000/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => setUser(response.data.user));
      }
      getUser();
    }
  }, [token]);

  /* GET ALL POSTS */
  React.useEffect(() => {
    if (token) {
      async function getPosts() {
        await axios
          .get("http://localhost:4000/post/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => setPosts(response.data));
      }
      getPosts();
    }
  }, [token, updatePosts]);

  if (user)
    return (
      <main className={style.mainContainer}>
        {alert && (
          <AlertMessage message="Ainda não é possivel tirar o gostei." />
        )}

        <div className={style.userSideBarContainer}>
          <div
            className={style.profilePicture}
            style={
              user.image
                ? {
                    backgroundImage: `url(http://localhost:4000/images/users/${user.image})`,
                  }
                : { backgroundImage: `url(${defaultPicture})` }
            }
          ></div>

          <Link to={"/profile"}>
            <h2>{user.name}</h2>
          </Link>
        </div>

        <div className={style.gridPostsContainer}>
          <CreatePostForm setUpdatePosts={setUpdatePosts} />

          {posts ? (
            posts.map((post) => {
              return (
                <PostItem
                  key={post._id}
                  content={post.content}
                  image={post.image}
                  likes={post.likes}
                  comments={post.comments}
                  postId={post._id}
                  ownersPostId={post.userId}
                  userId={user._id}
                  picture={post.userImage}
                  name={post.userName}
                  date={post.createdAt}
                  setAlert={setAlert}
                  token={token}
                  navigateIntoProfiles={navigateIntoProfiles}
                  viewPostDetails={viewPostDetails}
                />
              );
            })
          ) : (
            <h1>carregando</h1>
          )}
        </div>
      </main>
    );
  else
    return (
      <>
        <Loading />
        <h1 className={style.loginTitle}>Faça login para continuar</h1>
      </>
    );
};

export default Home;
