import axios from 'axios'
import React from 'react'

const Profile = () => {
  const [token, setToken] = React.useState(JSON.parse(localStorage.getItem('token')))
  const [userDetails, setUserDetails] = React.useState({})


  React.useEffect(()=>{
    axios.get('http://localhost:4000/user/profile',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((response)=> setUserDetails(response.data))
  },[token])

  console.log(userDetails)

  if(userDetails) return (
    <>
    <h1>{userDetails.user.name}</h1>
    </>
  )
  return <h1>carregando</h1>
}

export default Profile