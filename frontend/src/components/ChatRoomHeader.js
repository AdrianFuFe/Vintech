import { useParams } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "./TokenContextProvider";
import { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";

const ChatRoomHeader = (props) => {
  const { idB } = useParams();
  const [token] = useContext(TokenContext);
  const [data, setData] = useState("");

  useEffect(() => {
    const obtainInfo = async () => {
      const res = await fetch(`http://localhost:3300/user/${idB}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      setData(await res.json());
    };
    obtainInfo();
  }, []);

  return data ? (
    <div id="chatroom-header">
      <UserAvatar user={data.data[0]} />
      <h3>Conversación con el usuario: {data.data[0].username}</h3>
    </div>
  ) : (
    <h3>Cargando</h3>
  );
};
export default ChatRoomHeader;
