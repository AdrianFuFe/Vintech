import UserAvatar from "./UserAvatar";
import EditUserInfoButton from "./EditUserInfoButton";
import "../css/user-data-myprofile.css";

const UserDataMyProfile = (props) => {
  const { user } = props;

  return (
    <div id="user-data">
      <UserAvatar user={user} />
      <h3> Mis Datos </h3>
      <EditUserInfoButton>
        {" "}
        <p>EDITAR</p>{" "}
      </EditUserInfoButton>
      <ul>
        <li>{user.username || "alias"}</li>
        <li>
          {!user.fname || user.fname === "null" || user.fname === " "
            ? (user.fname = "nombre")
            : user.fname}
        </li>
        <li>
          {!user.lname || user.lname === "null" || user.lname === " "
            ? (user.lname = "apellidos")
            : user.lname}
        </li>
        <li>
          {!user.last_ubication ||
          user.last_ubication === "null" ||
          user.last_ubication === " "
            ? (user.last_ubication = "ubicación")
            : user.last_ubication}
        </li>
      </ul>
      <p id="bio">
        {!user.bio || user.bio === "null" || user.bio === " "
          ? (user.bio = "Biografía")
          : user.bio}
      </p>
    </div>
  );
};

export default UserDataMyProfile;
