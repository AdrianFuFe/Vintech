import GoBackButton from "./GoBackButton";
import { useLocation } from "react-router";

import "../css/header-title.css";

const HeaderBackTitle = (props) => {
  const location = useLocation();
  
  let title;
  if (location.pathname.includes("my-ratings")) {
    title = "MIS VALORACIONES";
  } else if (location.pathname.includes("my-products")) {
    title = "MIS PRODUCTOS";
  } else if (location.pathname.includes("my-history")) {
    title = "MI HISTORIAL";
  } else if (location.pathname.includes("mailbox")) {
    title = "BUZÓN";
  } else if (location.pathname.includes("my-config")) {
    title = "MI CONFIGURACIÓN";
  } else if (location.pathname.includes("edit-profile")) {
    title = "EDITAR MI PERFIL";
  } else if (location.pathname.includes("pwd")) {
    title = "CAMBIO DE CONTRASEÑA";
  } else if (location.pathname.includes("upload-product")) {
    title = "NUEVO PRODUCTO";
  } else if (location.pathname.includes("edit-product")) {
    title = "EDITAR PRODUCTO";
  } else {
    title = "PERFIL DE USUARIO";
  }

  return (
    <header id="header-title">
      <GoBackButton />
      <h2>{title}</h2>
    </header>
  );
};

export default HeaderBackTitle;
