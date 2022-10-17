import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Header.module.css";
import { Context } from "../context/UserContext";

const Header = () => {
  const {authenticated, logout} = React.useContext(Context)

  return (
    <header className={style.header}>
      <h2>DanBook</h2>

      <nav className={style.navContainer}> 
        {authenticated ?
        <>
        <Link to={"/"}>Inicio</Link>
        <Link to={"/profile"}>Minha conta</Link>
        <Link to={"/"} onClick={logout}>sair</Link>
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
