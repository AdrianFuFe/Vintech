import { Link, useLocation } from "react-router-dom";
import "../css/user-profile-menu.css";

const UserMenu = (props) => {
  const location = useLocation();

  const menuOptions = ["ratings", "onsale-products"];

  const menuOptionsArray = menuOptions.map((opt, index) => {
    let title;

    if (opt === "ratings") {
      title = "VALORACIONES";
    } else if (opt === "onsale-products") {
      title = "SUS PRODUCTOS";
    } else {
      title = "OPCION";
    }

    let url = `${location.pathname}/${opt}`;

    return (
      <li key={index}>
        <Link to={url}>
          <h3 user={props.user}>{title}</h3>
        </Link>
      </li>
    );
  });

  return (
    <div id="menu-profile">
      <ul id="user-profile-menu">{menuOptionsArray}</ul>
    </div>
  );
};

export default UserMenu;
