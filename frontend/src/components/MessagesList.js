const MessagesList = (props) => {
  const { messages } = props;

  let arrayMessages;
  messages
    ? (arrayMessages = messages.map((message, index) => {
        return (
          <li key={index} className="message">
            <p>{message.date}</p>
            <p>Envía {message.user_username}</p>
            <p>{message.text}</p>
          </li>
        );
      }))
    : (arrayMessages = "Cargando");

  return <ul>{arrayMessages}</ul>;
};
export default MessagesList;
