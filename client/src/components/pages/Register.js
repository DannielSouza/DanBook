import React from 'react'
import style from '../../styles/Register.module.css'
import {Link} from 'react-router-dom'
import { Context } from '../../context/UserContext'
import AlertMessage from '../AlertMessage'
import SuccessMessage from '../SuccessMessage'


const Register = () => {
  const [user, setUser] = React.useState({})
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const {register} = React.useContext(Context)

  function userStateChange({target}){
    setUser({...user, [target.name]:target.value})
  }
  
  async function submitUser(event){
    event.preventDefault()

    register(user, setSuccess, setError, setLoading)
  }


  return (
    <main className={style.container}>
      {error && <AlertMessage message={error}/>}
      {success && <SuccessMessage message={success}/>}


      <form onSubmit={submitUser} className={style.formContainer}>

        <h2 className={style.title}>Cadastrar</h2>

        <label htmlFor='name'>Nome</label>
        <input autoComplete="off" required type='text' name='name' id='name' onChange={userStateChange}/>

        <label htmlFor='email'>E-mail</label>
        <input autoComplete="off" required type='email' name='email' id='email' onChange={userStateChange}/>

        <label htmlFor='password'>Senha</label>
        <input required type='password' name='password' id='password' onChange={userStateChange}/>

        <label htmlFor='confirmpassword'>Repita sua senha</label>
        <input required type='password' name='confirmpassword' id='confirmpassword'  onChange={userStateChange}/>

        {loading?<button className='disabled'>Carregando...</button>:<button>Cadastrar</button>}
        <p className={style.dontHaveAccount}>Já possui uma conta? <Link to={'/login'}>Entre agora!</Link></p>

      </form>

      <div className={style.sideImage}>

      </div>

    </main>
  )
}

export default Register