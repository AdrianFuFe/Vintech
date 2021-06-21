import UserAvatar from './UserAvatar';
import EditUserInfoButton from './EditUserInfoButton';
import "../css/user-data-myprofile.css";


const UserDataMyProfile = (props) => {
  const {user} = props;
  console.log(user);
  
  return(
    <div id='user-data'>
      <UserAvatar />
      <ul>
        <li><h3> Mis Datos </h3></li>
        <li>{user.username ? (user.username) : ('alias')}</li>
        <li>{user.fname ? (user.fname) : ('nombre')}</li>
        <li>{user.lname ? (user.lname) : ('apellidos')}</li>
        <li>{user.last_ubication ? (user.last_ubication) : ('ubicación')}</li>
        <li>{user.bio ? (user.bio) : ('Biografía')}</li>
      </ul>
      <EditUserInfoButton/>
    </div>
  )
}

export default UserDataMyProfile;