import { useHistory } from "react-router-dom";
import decodeToken from "../utils/decodeToken";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";

const ConfirmButton = (props) => {
  const { token, id } = props;
  const decodedToken = decodeToken(token);

  const history = useHistory();

  async function confirmSell() {
    const res = await fetch(`http://localhost:3300/product/${id}/sell`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    });

    const data = await res.json();

    console.log(data);
    history.push(`/user/${decodedToken.id}/my-bookings`);
  }

  const [product] = useRemoteSingleProduct(id);

  let display;
  product.data && product.data[0].status === "selled"
    ? (display = false)
    : (display = true);

  return (
    <>{display && <button onClick={confirmSell}>Confirmar venta</button>}</>
  );
};

export default ConfirmButton;
