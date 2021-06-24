import ReactTimeAgo from "react-time-ago";

const MessageTemplate = (props) => {
  const info = {
    text : 'Donec in ligula placerat, auctor magna et, elementum metus. Aenean in molestie nisi, vel hendrerit quam. Vestibulum eu nunc libero. Proin ultrices elementum tempor.',
    date : "2021-06-24T14:06:53.000Z",
  }


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