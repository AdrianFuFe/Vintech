import ChatListTemplate from "./ChatListTemplate";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "./TokenContextProvider";
import decodeToken from "../utils/decodeToken";

const ChatList = (props) => {
  const [token] = useContext(TokenContext);

  const decodedToken = decodeToken(token);
  const { info } = props;
  let arrayConversations;
  info
    ? (arrayConversations = info.map((info, index) => {
        return (
          <li key={index} className="conversations">
            <Link
              to={`/product/${info.id_product}/user/${decodedToken.id}/messages/`}
            >
              <ChatListTemplate info={info} />
            </Link>
          </li>
        );
      }))
    : (arrayConversations = "Todavía no hay conversaciones");

  return <ul>{arrayConversations}</ul>;
};
export default ChatList;
