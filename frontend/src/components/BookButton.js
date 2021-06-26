import { /* Link, */ useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";
import sendMessage from "../utils/sendMessage";
import { useHistory } from "react-router";

const BookButton = (props) => {
  const idProduct = useParams();
  // console.log('id del producto: ' + idProduct.id);
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  // console.log('id del comprador: ' + decodedToken.id);
  const [product] = useRemoteSingleProduct();
  // console.log('id del vendedor: ' + product.data[0].user_id);

  const history = useHistory();

  const [error, setError] = useState("");

  const makeBooking = async (e) => {
    // e.preventDefault();

    const info = {
      id_user_A: product.data[0].user_id,
      id_user_B: decodedToken.id,
      id_product: idProduct.id,
    };

    const res = await fetch(`http://localhost:3300/product/${idProduct.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(info),
    });
    const data = await res.json();

    if (res.ok) {
      setError("");
      sendMessage({
        token,
        to: info.id_user_B,
        text: "Has recibido una reserva para este producto",
      });
      history.goBack();
    } else {
      setError(data.error);
    }
  };

  return (
    <>
      <button onClick={(e) => makeBooking(e.target.value)}>Reservar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
export default BookButton;
