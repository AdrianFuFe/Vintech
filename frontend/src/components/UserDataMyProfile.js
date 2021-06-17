import UserAvatar from './UserAvatar';
import useRemoteUser from '../hooks/useRemoteUser';
import "../css/user-data-myprofile.css";


const UserDataMyProfile = (props) => {
  const [user] = useRemoteUser();
  const data=  user.data;
  let userData;

  data ? (userData = data[0]) : (userData='cargando datos de usuario')
  
  return(
    <div id='user-data'>
      <UserAvatar />
      <ul>
        <li><h3> Mis Datos </h3></li>
        <li>{userData.fname}</li>
        <li>{userData.lname}</li>
        <li>{userData.last_ubication}</li>
        <li>{userData.bio}</li>
      </ul>
    </div>
  )
}

export default UserDataMyProfile;