import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

const MessagesList = (props) => {
  const { messages } = props;

  let arrayMessages;
  messages
    ? (arrayMessages = messages.map((message, index) => {
        return (
          <li key={index} className="message">
            <p className="message-user">{message.user_username}</p>
            <p className="chatroom-time-ago">
              <ReactTimeAgo date={message.date} locale="es-ES" />
            </p>
            {/* <p>{message.date}</p> */}
            <p className="message-text">{message.text}</p>
          </li>
        );
      }))
    : (arrayMessages = "Cargando");

  return <ul id="messages-list">{arrayMessages}</ul>;
};
export default MessagesList;
