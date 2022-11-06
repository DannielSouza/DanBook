import React from "react";
import style from "../../styles/Profile.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import AlertMessage from "../AlertMessage";
import Loading from "../Loading";
import PostItem from "../PostItem";
import defaultPicture from "../../images/defaultUser.png";
import FollowButton from "../FollowButton";
import FollowsModal from "../FollowsModal";
import calendar from "../../images/calendar.png";
import info from "../../images/info.png";

const PeopleProfile = () => {
  const { id } = useParams();
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [profile, setProfile] = React.useState();
  const [user, setUser] = React.useState();
  const [alert, setAlert] = React.useState(false);
  const [userFollowers, setUserFollowers] = React.useState()
  const [followsModal, setFollowsModal] = React.useState(false)
  let profilePicture;
  const navigateIndoProfiles = false;
  const viewPostDetails = true
  let formatedDate
    if(profile){
      const formatedDateComplete = profile.user[0].createdAt.split("T")[0].split("-");
      formatedDate = `${formatedDateComplete[2]}/${formatedDateComplete[1]}/${formatedDateComplete[0]}`;
    }

  React.useEffect(() => {
    async function getData() {
      await axios
        .get(`http://localhost:4000/user/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfile(response.data)
          setUserFollowers(response.data.user[0].followers.length)
        });
    }
    getData();
  }, []);


  React.useEffect(() => {
    async function getUser() {
      await axios
        .get('http://localhost:4000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data)
        });
    }
    getUser();
  }, []);

  if (profile) {
    if (profile.user[0].image)
      profilePicture = `url(http://localhost:4000/images/users/${profile.user[0].image})`;
    else profilePicture = `url(${defaultPicture})`;
  }


  if (profile)
    return (
      <main className={style.mainContainer}>
        {alert && (
          <AlertMessage message="Ainda não é possivel tirar o gostei." />
        )}
        {followsModal && <FollowsModal followers={profile.user[0].followers[0]} setFollowsModal={setFollowsModal}/> }
        <div className={style.mainUserContainer}>
        <div className={style.userContainer}>
        <div className={style.userInfoContainer}>
          <div
            className={style.userImageContainer}
            style={{ backgroundImage: profilePicture }}
          ></div>

          <div className={style.userInfo}>
            <h1 className={style.userName}>{profile.user[0].name}</h1>

            <div className={style.userInfoItem}>
              <div onClick={()=> setFollowsModal(true)} style={{'cursor': 'pointer'}}>
                <p>Seguidores</p>
                <span>{userFollowers}</span>
              </div>
              <div>
                <p>Publicações</p>
                <span>{profile.posts.length}</span>
              </div>
            </div>
              <FollowButton setUserFollowers={setUserFollowers} userId={profile.user[0]._id} followers={profile.user[0].followers}/>
            </div>
          </div>
          </div>
        

        <div className={style.infoContainer}>
              <div className={style.infoItem}>
                <img src={info} alt='Mensagem em destaque do perfil.' />
                <span>{profile.user[0].description}</span>
              </div>
              <div className={style.infoItem}>
                <img src={calendar} alt='Data de criação do perfil.' />
                <span>Ingressou em {formatedDate}</span>
              </div>
            </div>
            </div>
        <div className={style.postsContainer}>
          {profile && user &&
            profile.posts.map((item) => {
              return (
                <PostItem
                  setAlert={setAlert}
                  userId={user.user._id}
                  key={item._id}
                  date={item.createdAt}
                  name={profile.user[0].name}
                  picture={profile.user[0].image}
                  postId={item._id}
                  image={item.image}
                  content={item.content}
                  likes={item.likes}
                  comments={item.comments}
                  navigateIndoProfiles={navigateIndoProfiles}
                  viewPostDetails={viewPostDetails}
                />
              );
            })}
        </div>
      </main>
    );
  return (
    <>
      <Loading />
    </>
  );
};

export default PeopleProfile;
