import ChatListTemplate from './ChatListTemplate';

const ChatList = (props) => {
  const {info} = props;

  console.log(info);
  
  let arrayConversations;
  info
  ?(arrayConversations = info.map((info/* ,index */) => {
    /* const buyerInfo = buyer[index]; */
    return (
      <li key={info.id} className="conversations">
        <ChatListTemplate />
      </li>
    );
  })) 
  : (arrayConversations = 'Todavía no hay conversaciones')


  return(<ul>{arrayConversations}</ul>)
}
export default ChatList;