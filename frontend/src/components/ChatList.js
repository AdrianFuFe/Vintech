import ChatListTemplate from './ChatListTemplate';
import { Link } from 'react-router-dom';

const ChatList = (props) => {
  const {info} = props;
  
  let arrayConversations;
  info
  ?(arrayConversations = info.map((info/* ,index */) => {
    /* const buyerInfo = buyer[index]; */
    return (
      <li key={info.id} className="conversations">
        <Link to={`/product/${info.id_product}/user/${info.id_user_A}/messages/${info.id_user_B}`}>
          <ChatListTemplate text={info.text} date={info.date} /* userRoute={info.id_user_A} productRoute={info.id_product} buyerRoute={info.id_user_B} *//>
        </Link>
      </li>
    );
  })) 
  : (arrayConversations = 'Todavía no hay conversaciones')


  return(<ul>{arrayConversations}</ul>)
}
export default ChatList;