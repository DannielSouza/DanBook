import React from 'react'
import style from '../styles/PostEdit.module.css'
import axios from 'axios'
import SuccessMessage from '../components/SuccessMessage'
import { useNavigate } from "react-router-dom";

const PostEdit = ({image, content, postId, setEditIsModalOpen}) => {
  const [editedPost, setEditedPost] = React.useState({content:content})
  const token = JSON.parse(window.localStorage.getItem('token'))
  const [successUpdate, setSuccessUpdate] = React.useState(false)
  const navigate = useNavigate()

  function changePostContent({target}){
    setEditedPost({...editedPost, [target.name]: target.value})
  }
  
  function userImageStateChange({target}){
    setEditedPost({ ...editedPost, [target.name]: target.files[0] })
  }

  async function savePostEdits(event){
    setSuccessUpdate(false)
    event.preventDefault()
    const formData = new FormData()

    Object.keys(editedPost).forEach((key)=>{
      formData.append(key, editedPost[key])
    })
  
    try {
      setSuccessUpdate(false)
      await axios.put(`http://localhost:4000/post/${postId}`, formData, {
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      setSuccessUpdate(true)
      navigate('/')
      setTimeout(() => {
        navigate('/profile')
      }, );
      
    } catch (error) {
      console.log(error)
    }finally{
      if(successUpdate){
        setTimeout(() => {
          setSuccessUpdate(false)
        }, 2000);
      }
    }
  }

  return (
    <div className={style.container}>
      {successUpdate && <SuccessMessage message={'Post atualizado com sucesso.'} />}
      <div className={style.contentContainer}>

      <h1 className={style.title}>Editar publicação</h1>

      <textarea value={editedPost.content} maxLength="300" placeholder='Faça uma publicação! :D' name='content' id='content' className={style.formInput} onChange={changePostContent}/>
      <div className={style.formFileContainer}>
        {image? <p>Gostaria de alterar a imagem?</p>: <p>Gostaria de adicionar uma imagem?</p>}
        <input className={style.formFile} type='file' name='image' id='image' onChange={userImageStateChange}/>
      </div>


      <div className={style.buttonContainer}>
        <button className={style.cancelButton} onClick={()=>setEditIsModalOpen(false)}>Cancelar</button>
        <button onClick={savePostEdits} className={style.saveButton}>Salvar</button>
      </div>
      


      </div>
    </div>
  )
}

export default PostEdit