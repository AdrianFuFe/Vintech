const MessagesList = (props) => {
  const { messages } = props;
  console.log(messages);

  let arrayMessages;
  messages
    ? (arrayMessages = messages.map((message, index) => {
        return (
          <li key={index} className="message">
            <h4>{message.id}</h4>
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
