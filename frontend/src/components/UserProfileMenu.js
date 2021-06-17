import { Link } from "react-router-dom";
import "../css/user-profile-menu.css";

const UserProfileMenu = (props) => {
  const menuOptions = [
    "Valoraciones",
    "Productos",
    "Historial",
    "Configuración",
  ];

  const menuOptionsArray = menuOptions.map((opt, index) => (
    <li key={index}>
      <Link to={`/user/:id/${opt}`}>
        <h3>{opt}</h3>
      </Link>
    </li>
  ));

  return(
    <div id="menu-profile">
      <ul>{menuOptionsArray}</ul>
    </div>
  )
}

export default UserProfileMenu;