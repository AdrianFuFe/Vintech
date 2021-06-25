import ReactTimeAgo from "react-time-ago";

const ChatListTemplate = (props) => {
  const {text, date/* , myUserRoute, productRoute, buyerRoute */} = props;

  return(
      <>
        <p>{text}</p>
        <p className="time-ago">
          <ReactTimeAgo date={date} locale="es-ES" />
        </p>
      </>
  )
}
export default ChatListTemplate