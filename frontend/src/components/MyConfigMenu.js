import { Link } from "react-router-dom";
import { useParams } from "react-router";
/* import "../css/user-profile-menu.css"; */

const MyConfigMenu = (props) => {

  let {id} = useParams();

  const menuOptions = [
    "edit",
  ];

  const menuOptionsArray = menuOptions.map((opt, index) => {
    let title;
    
    if (opt === 'edit') {
      title='EDITAR MI PERFIL';
    }

    let url = `http://localhost:3000/user/${id}/my-profile/${opt}`;

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