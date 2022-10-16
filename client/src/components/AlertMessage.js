import React from 'react'
import style from '../styles/AlertMessage.module.css'

const AlertMessage = ({message}) => {
  return (
    <span className={style.alert}>{message}</span>
  )
}

export default AlertMessage