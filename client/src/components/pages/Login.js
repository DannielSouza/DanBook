import React from 'react'
import style from '../../styles/Register.module.css'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import AlertMessage from '../AlertMessage'
import SuccessMessage from '../SuccessMessage'
import {Context} from '../../context/UserContext'


const Login = () => {
  const [user, setUser] = React.useState({})
  const [success, setSuccess] = React.useState(null)
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const {login} = React.useContext(Context)


  function userStateChange({target}){
    setUser({
      ...user, [target.name]: target.value
    })
  }

  
  async function userLogin(event){
    event.preventDefault()

    login(user, setSuccess, setError, setLoading)
  }


  return (
    <main className={style.container}>
      {error && <AlertMessage message={error}/>}
      {success && <SuccessMessage message={success}/>}

      <form onSubmit={userLogin} className={style.formContainer}>

        <h2 className={style.title}>Entrar</h2>

        <label htmlFor='email'>E-mail</label>
        <input autoComplete="off" required type='email' name='email' id='email' onChange={userStateChange}/>

        <label htmlFor='password'>Senha</label>
        <input required type='password' name='password' id='password' onChange={userStateChange}/>

        {loading?<button className='disabled'>Carregando...</button>:<button>Entrar</button>}

        <p className={style.dontHaveAccount}>Não possui uma conta? <Link to={'/register'}>Registre-se!</Link></p>
      </form>

      <div className={style.sideImage}>

      </div>

    </main>
  )
}

export default Login