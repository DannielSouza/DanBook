import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom";

const baseApiURL = 'http://localhost:4000/user'

export default function useAuth(){
  const [authenticated, setAuthenticated] = React.useState(false)
  const navigate = useNavigate()

  /* VERIFY TOKEN AUTOMATICALLY */
  React.useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  }, [])

  /* REGISTER USER */
  async function register(user, setSuccess, setError, setLoading){
    try {
      setSuccess(null)
      setError(null)
      setLoading(true)
      const data = await axios.post(`${baseApiURL}/register`, user)  
      .then((response) => response.data)
      setSuccess(data.message)  
      await authUser(data)
    } catch ({response}) {
      setError(response.data.message)
    }finally{
      setLoading(false)
    }
  }

  /* LOGIN USER */
  async function login(user, setSuccess, setError, setLoading){
    try {
      setSuccess(null)
      setError(null)
      setLoading(true)
      const data = await axios.post(`${baseApiURL}/login`, user)
      .then((response) => response.data)
      setSuccess('Usuário logado com sucesso.')  
      await authUser(data)
    } catch ({response}) {
      setError(response.data.message)
    }finally{
      setLoading(false)
    }
  }

  /* AUTH USER */
  async function authUser(data){
    setTimeout(()=>{
      setAuthenticated(true)
      localStorage.setItem('token', JSON.stringify(data.token))
      axios.defaults.headers.Authorization = `Bearer ${data.token}`
      navigate('/')
    },1000)
  }

  /* LOGOUT USER */
  function logout(){
    setAuthenticated(false)
    window.localStorage.removeItem("token")
    axios.defaults.headers.Authorization = undefined
    window.location('/')
  }




  return {register, authenticated, logout, login}
}