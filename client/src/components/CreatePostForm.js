import React from 'react'
import style from '../styles/CreatePostForm.module.css'
import axios from 'axios'


const CreatePostForm = ({setUpdatePosts}) => {
  const [post, setPost] = React.useState({})
  const [token, setToken] = React.useState(JSON.parse(window.localStorage.getItem('token')))
  const contentInput = React.useRef()
  const fileInput = React.useRef()

  function changePostContent({target}){
    setPost({...post, [target.name]: target.value})
  }
  
  function userImageStateChange({target}){
    setPost({ ...post, [target.name]: target.files[0] })
  }




  async function createForm(event){
    event.preventDefault()
    const formData = new FormData()

    Object.keys(post).forEach((key)=>{
      formData.append(key, post[key])
    })

    await axios.post(`http://localhost:4000/post/create`, formData,{
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(()=>{
      
      contentInput.current.value = ''
      fileInput.current.value = ''
      setUpdatePosts((before)=> before +1)
    })
  }

  return (
    <form onSubmit={createForm} className={style.formContainer}>
      <textarea maxLength="300" ref={contentInput} placeholder='Faça uma publicação! :D' name='content' id='content' className={style.formInput} onChange={changePostContent}/>
      <div className={style.formFileContainer}>
        <p>Gostaria de carregar uma imagem?</p>
        <input ref={fileInput} className={style.formFile} type='file' name='image' id='image' onChange={userImageStateChange}/>
      </div>
      <button type='submit'>POSTAR</button>

    </form>
  )
}

export default CreatePostForm