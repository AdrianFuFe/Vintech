import { useParams, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";

const ChatButton = (props) => {
  const idProduct = useParams();
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const [product] = useRemoteSingleProduct();

  
  const [error, setError] = useState('');

  let route;
  token && product ? (route=`/product/${idProduct.id}/user/${decodedToken.id}/messages/:id_user_B`) : (route='/') 
  const history = useHistory('');

  const goChat = async (e) => {
    history.push(route);
  }

  return(
    <>
      <button onClick={(e) => goChat(e.target.value)}>Ir al chat</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  )
}
export default ChatButton;