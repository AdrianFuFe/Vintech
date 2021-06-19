import UserAvatar from './UserAvatar';
import "../css/user-data-myprofile.css";


const UserDataMyProfile = (props) => {
  const {user} = props;
  
  return(
    <div id='user-data'>
      <UserAvatar />
      <ul>
        <li><h3> Mis Datos </h3></li>
        <li>{user.fname}</li>
        <li>{user.lname}</li>
        <li>{user.last_ubication}</li>
        <li>{user.bio}</li>
      </ul>
    </div>
  )
}

export default UserDataMyProfile;