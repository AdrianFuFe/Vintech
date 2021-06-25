const ChatRoomHeader = (props) => {
  const { messages } = props;
  let product;
  messages
    ? (product = messages[0].id_product)
    : (product = "no se ha podido cargar la infomacion del producto");
  return (
    <>
      <h2>Producto {product}</h2>
    </>
  );
};
export default ChatRoomHeader;
