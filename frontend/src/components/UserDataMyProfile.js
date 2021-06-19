import UserAvatar from './UserAvatar';
import "../css/user-data-myprofile.css";


const UserDataMyProfile = (props) => {
  const {user} = props;
  
  return(
    <div id='user-data'>
      <UserAvatar />
      <ul>
        <li><h3> Mis Datos </h3></li>
        <li>{user.fname ? (user.fname) : ('nombre')}</li>
        <li>{user.lname ? (user.lname) : ('apellidos')}</li>
        <li>{user.last_ubication ? (user.last_ubication) : ('ubicación')}</li>
        <li>{user.bio ? (user.bio) : ('Biografía')}</li>
      </ul>
    </div>
  )
}

export default UserDataMyProfile;