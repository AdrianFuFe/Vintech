import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Link, useLocation } from "react-router-dom";
import "../css/user-profile-menu.css";

const UserMenuMyProfile = (props) => {
  const location = useLocation();

  const menuOptions = [
    "my-ratings",
    "my-products",
    "my-bookings",
    "my-history",
    "my-config",
  ];

  const menuOptionsArray = menuOptions.map((opt, index) => {
    let title;

    if (opt === "my-ratings") {
      title = "MIS VALORACIONES";
    } else if (opt === "my-products") {
      title = "MIS PRODUCTOS";
    } else if (opt === "my-bookings") {
      title = "MIS RESERVAS";
    } else if (opt === "my-history") {
      title = "MI HISTORIAL";
    } else if (opt === "my-config") {
      title = "CONFIGURACIÓN";
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

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useContext(TokenContext);
  const logOut = () => {
    setToken("");
  };

  return (
    <div id="menu-profile">
      <ul id="my-user-menu">
        {menuOptionsArray}
        <li onClick={logOut}>
          <Link to="/login">
            <h3 user={props.user}>SALIR</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenuMyProfile;
