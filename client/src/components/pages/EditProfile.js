import React from 'react'
import style from '../../styles/Profile.module.css'
/* import { Link } from "react-router-dom"; */
import axios from 'axios'
import AlertMessage from '../AlertMessage'
import SuccessMessage from '../SuccessMessage'

const Profile = () => {
  const [user, setUser] = React.useState({})
  const [token, setToken] = React.useState(JSON.parse(localStorage.getItem('token')))
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)

  const [preview, setPreview] = React.useState()

  React.useEffect(()=>{
    axios.get('http://localhost:4000/user/checkuser',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((response)=> setUser(response.data))
  },[token])

  function userStateChange({target}){
    setUser({
      ...user, [target.name]:target.value
    })
  }

  function userImageStateChange({target}){
    setPreview(target.files[0])
    setUser({ ...user, [target.name]: target.files[0] })
    console.log(target.files)
  }

  async function changeUserData(event){
    event.preventDefault()

    const formData = new FormData()

    await Object.keys(user).forEach((key)=>{
      formData.append(key, user[key])
    })

    const data = await axios.put(`http://localhost:4000/user/edit`, formData,{
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((response)=>{
      setSuccess('Usuário atualizado com sucesso.')  
    })
      .catch(({response})=>{
        setError(response.data.message)
      })
  }


  return (
    <main className={style.container}>
      {error && <AlertMessage message={error}/>}
      {success && <SuccessMessage message={success}/>}


      <form onSubmit={changeUserData} className={style.formContainer}>

        <h2 className={style.title}>Minha conta</h2>

        <label htmlFor='image'>Foto de perfil</label>
        {(user.image || preview) &&
          (<img src={
            preview
              ? URL.createObjectURL(preview)
              : `http://localhost:4000/images/users/${user.image}`
          } alt='foto de perfil'/>)
        }
        <input className={style.fileForm} type='file' name='image' id='image' value={''} onChange={userImageStateChange}/>
        
        <label htmlFor='name'>Nome</label>
        <input type='text' name='name' id='name' value={user.name || ''} onChange={userStateChange}/>

        <label htmlFor='email'>E-mail</label>
        <input type='email' name='email' id='email' value={user.email || ''} onChange={userStateChange}/>

        <label htmlFor='password'>Senha</label>
        <input type='password' name='password' id='password' onChange={userStateChange}/>

        <label htmlFor='confirmpassword'>Repita sua senha</label>
        <input type='password' name='confirmpassword' id='confirmpassword' onChange={userStateChange}/>

        {/* {loading?<button className='disabled'>Carregando...</button>:<button>Entrar</button>} */}
        <button>Salvar</button>

      </form>
    </main>
  )
}

export default Profile