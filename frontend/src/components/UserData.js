import UserAvatar from "./UserAvatar";

const UserData = (props) => {
  const { user } = props;

  return (
    <div id="user-data">
      <UserAvatar user={user} />
      <ul>
        <li>
          <h3> Datos de {user.username} </h3>
        </li>
        <li>{user.fname === "null" ? "nombre" : user.fname}</li>
        <li>{user.lname}</li>
        <li>{user.last_ubication}</li>
        <li>{user.bio}</li>
      </ul>
    </div>
  );
};

export default UserData;
