import Avatar from "@material-ui/core/Avatar";

const UserAvatar = (props) => {
  const { user } = props;

  return (
    <div>
      {user ? (
        user.img ? (
          <Avatar
            alt="Avatar del usuario"
            src={`http://localhost:3300/uploads/avatars/${user.img}`}
          />
        ) : (
          <Avatar alt="Avatar del usuario" />
        )
      ) : (
        <Avatar alt="Avatar del usuario" />
      )}
    </div>
  );
};

export default UserAvatar;
