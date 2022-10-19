import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Header.module.css";
import { Context } from "../context/UserContext";

const Header = () => {
  const {authenticated, logout} = React.useContext(Context)

  return (
    <header className={style.header}>
      <Link to={'/'}><h2>DanBook</h2></Link>

      <nav className={style.navContainer}> 
        {authenticated ?
        <>
        <Link to={"/"}>Inicio</Link>
        <div className={style.menuCircle}></div>
        <Link to={"/profile"}>Minha conta</Link>
        <div className={style.menuCircle}></div>
        <Link to={"/"} onClick={logout}>Sair</Link>
        </>
        :
        <>
        <Link to={"/login"}>Entrar</Link>
        <Link to={"/register"}>Registrar-se</Link>
        </>
        }
      </nav>
    </header>
  );
};

export default Header;
