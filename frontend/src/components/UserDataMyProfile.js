import UserAvatar from "./UserAvatar";
import EditUserInfoButton from "./EditUserInfoButton";
import "../css/user-data-myprofile.css";

const UserDataMyProfile = (props) => {
  const { user } = props;

  return (
    <div id="user-data">
      <UserAvatar user={user} />
      <h3> Mis Datos </h3>
      <EditUserInfoButton> <p>EDITAR</p> </EditUserInfoButton>
      <ul>
        <li>{user.username ? user.username : "alias"}</li>
        <li>{user.fname ? user.fname : "nombre"}</li>
        <li>{user.lname ? user.lname : "apellidos"}</li>
        <li>{user.last_ubication ? user.last_ubication : "ubicación"}</li>
      </ul>
      <p id='bio'>{user.bio ? user.bio : "Biografía"}</p>
    </div>
  );
};

export default UserDataMyProfile;
