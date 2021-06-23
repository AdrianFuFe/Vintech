import { /* Link, */ Redirect, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";

const BuyButton = (props) => {
  const idProduct = useParams();
  // console.log('id del producto: ' + idProduct.id);
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  // console.log('id del comprador: ' + decodedToken.id);
  const [product] = useRemoteSingleProduct();
  // console.log('id del vendedor: ' + product.data[0].user_id);
  
  const [error, setError] = useState('');
  
  const makeBooking = async (e) => {
    // e.preventDefault();

    const info = {
      id_user_A : product.data[0].user_id,
      id_user_B : decodedToken.id,
      id_product : idProduct.id,
    }
    console.log(info);

    const res = await fetch(`http://localhost:3300/product/${idProduct.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${token}`,
      },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setError('');
      <Redirect to='/'></Redirect>
    } else {
      setError(data.error);
    }
  };

  return(
    <>
      <button onClick={(e) => makeBooking(e.target.value)}>Reservar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  )
}
export default BuyButton;