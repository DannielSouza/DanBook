import React from 'react'
import style from '../styles/PostDelete.module.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SuccessMessage from './SuccessMessage';

const PostDele = ({postId, setIsDeleteModalOpen}) => {
  const [successDelete, setSuccessDelete] = React.useState(false)
  const token = JSON.parse(window.localStorage.getItem('token'))
  const navigate = useNavigate()

  async function deletePost(){
    try {
      
      await axios.delete(`http://localhost:4000/post/${postId}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      navigate('/')
      setTimeout(() => {
        navigate('/profile')
      }, );

    } catch (error) {
      console.log(error)
    }finally{
      if(successDelete){
        setTimeout(() => {
          setSuccessDelete(false)
        }, 2000);
      }
    }
  }

  return (
    <div className={style.container}>
      {successDelete && <SuccessMessage message={'Post excluido com sucesso.'}/>}


      <div className={style.contentContainer}>
        <h1 className={style.title}>Deseja realmente excluir a publicação?</h1>

        <div className={style.buttonContainer}>
        <button className={style.saveButton} onClick={()=>setIsDeleteModalOpen(false)}>Cancelar</button>
        <button onClick={deletePost} className={style.cancelButton}>Excluir</button>
      </div>

      </div>
    </div>
  )
}

export default PostDele