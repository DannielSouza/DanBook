import React from 'react'
import style from '../styles/SuccessMessage.module.css'

const SuccessMessage = ({message}) => {
  return (
    <span className={style.success}>{message}</span>
  )
}

export default SuccessMessage