import MessageTemplate from "./MessageTemplate";

const MessagesList = (props) => {
  const { messages } = props;

  let arrayMessages;
  messages
  ?(arrayMessages = messages.map((message) => {
    return (
      <li key={message.id} className="message">
        <MessageTemplate info={message} />
      </li>
    );
  })) 
  : (arrayMessages = 'Todavía no hay valoraciones')


  return(<ul>{arrayMessages}</ul>)
}
export default MessagesList;