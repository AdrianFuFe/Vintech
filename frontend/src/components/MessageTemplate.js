import ReactTimeAgo from "react-time-ago";

const MessageTemplate = (props) => {
  const {info} = props;

  return (
    <>
      <p>{info.text}</p>
      <p className="time-ago">
        <ReactTimeAgo date={info.date} locale="es-ES" />
      </p>
    </>
  )
}
export default MessageTemplate;