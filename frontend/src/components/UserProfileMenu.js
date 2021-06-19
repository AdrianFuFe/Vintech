import { Link, useLocation } from "react-router-dom";
import "../css/user-profile-menu.css";


const UserProfileMenu = (props) => {
  
  const location = useLocation();
  
  const menuOptions = [
    "my-ratings",
    "my-products",
    "my-history",
    "my-config",
  ];
  
  const menuOptionsArray = menuOptions.map((opt, index) => {
    let title;
    
    if (opt === 'my-ratings') {
      title='MIS VALORACIONES';
    }else if (opt === 'my-products'){
      title='MIS PRODUCTOS';
    }else if (opt ==='my-history'){
      title='MI HISTORIAL';
    }else if (opt ==='my-config'){
      title='MI CONFIGURACION';
    }else {
      title='MI PERFIL';
    }
    
    let url = `${location.pathname}/${opt}`;
    
    return(
    <li key={index}>
      <Link to={url}>
        <h3>{title}</h3>
      </Link>
    </li>
    )
  });
  

  return(
    <div id="menu-profile">
      <ul>{menuOptionsArray}</ul>
    </div>
  )
}

export default UserProfileMenu;