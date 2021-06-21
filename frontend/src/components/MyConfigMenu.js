import { Link } from "react-router-dom";
/* import "../css/user-profile-menu.css"; */

const MyConfigMenu = (props) => {

  const menuOptions = [
    "edit-profile",
    'pwd',
  ];

  const menuOptionsArray = menuOptions.map((opt, index) => {
    let title;
    
    switch (opt){
      case 'edit-profile':
        title='EDITAR MIS DATOS';
        break
      case 'pwd':
        title='CAMBIAR CONTRASEÑA'
        break;
      default:
        title='OPCION'
    }

    let url = `${opt}`;

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
export default MyConfigMenu;