import GoBackButton from "./GoBackButton";
import { useLocation } from "react-router";

import "../css/header-title.css";

const HeaderBackTitle = (props) => {
  const location = useLocation();
  let title;

  if (location.pathname.includes("ratings")) {
    title = "MIS VALORACIONES";
  } else if (location.pathname.includes("products")) {
    title = "MIS PRODUCTOS";
  } else if (location.pathname.includes("history")) {
    title = "HISTORIAL";
  } else if (location.pathname.includes("mailbox")) {
    title = "BUZÓN";
  } else if (location.pathname.includes("config")) {
    title = "CONFIGURACIÓN";
  } else if (location.pathname.includes("upload-product")) {
    title = "NUEVO PRODUCTO";
  } else if (location.pathname.includes("edit-product")) {
    title = "EDITAR PRODUCTO";
  } else {
    title = "MI PERFIL";
  }

  return (
    <header id="header-title">
      <GoBackButton />
      <h2>{title}</h2>
    </header>
  );
};

export default HeaderBackTitle;
