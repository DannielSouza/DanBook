import axios from 'axios'
import React from 'react'
import style from '../../styles/Profile.module.css'
import {Link} from 'react-router-dom'
import PostItem from '../PostItem'
import AlertMessage from "../AlertMessage";
import Loading from '../Loading'
import defaultPicture from '../../images/defaultUser.png'


const Profile = () => {
  const [token, setToken] = React.useState(JSON.parse(localStorage.getItem('token')))
  const [userDetails, setUserDetails] = React.useState(null)
  const [alert, setAlert] = React.useState(false);
  let profilePicture


  React.useEffect(()=>{
    axios.get('http://localhost:4000/user/profile',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((response)=> setUserDetails(response.data))
  },[token])


  if(userDetails){
    if(userDetails.user.image) profilePicture = `url(http://localhost:4000/images/users/${userDetails.user.image})`
    else profilePicture = `url(${defaultPicture})`
  }

  
  if(userDetails) return (
    <main className={style.mainContainer}>
    {alert && <AlertMessage message="Ainda não é possivel tirar o gostei." />}
    <div className={style.userInfoContainer}>
      <div 
        className={style.userImageContainer}
        style={{backgroundImage: profilePicture}} 
        >
      </div>
      
      <div className={style.userInfo}>
        <h1 className={style.userName}>{userDetails.user.name}</h1>

        <div className={style.userInfoItem}>
          <div>
            <p>Seguidores</p>
            <span>{userDetails.user.followers.length}</span>
          </div>
          <div>
            <p>Publicações</p>
            <span>{userDetails.posts.length}</span>
          </div>
        </div>

        <Link to={'/profile/edit'}><button className={style.editProfileButton}>Editar perfil</button></Link>
      </div>
    </div>


    <div className={style.postsContainer}>
    {userDetails && userDetails.posts.map((item)=>{
      return <PostItem setAlert={setAlert} userId={userDetails.user._id} key={item._id} date={item.createdAt} name={userDetails.user.name} picture={userDetails.user.image} postId={item._id} image={item.image} content={item.content} likes={item.likes} comments={item.comments}/>
    })}
    </div>


    </main>
  )
  return (
    <>
      <Loading />
    </>
  )
}

export default Profile