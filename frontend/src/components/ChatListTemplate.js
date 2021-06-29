import ReactTimeAgo from "react-time-ago";
import { useContext } from "react";
import { TokenContext } from "./TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import useWhoAmI from "../hooks/useWhoAmI";
import UserAvatar from "./UserAvatar";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";

const ChatListTemplate = (props) => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);

  const { info } = props;

  const [user] = useWhoAmI(info, decodedToken);

  return user.data ? (
    <>
      <UserAvatar user={user.data[0]} />
      <h3 id="chatlist-user">{user.data[0].username}</h3>
      <h4 id="chatlist-product">{product.data[0].title}</h4>
      <p>{info.text}</p>
      <p id="chatlist-time-ago">
        <ReactTimeAgo date={info.date} locale="es-ES" />
      </p>
    </>
  ) : (
    <h3>Cargando mensajes</h3>
  );
};
export default ChatListTemplate;
