import { TokenContext } from "./TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import sendMessage from "../utils/sendMessage";
import useRemoteSingleBooking from "../hooks/useRemoteSingleBooking";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";

const BookingOptionscancel = (props) => {
  const { id } = props;
  const infoParams = useParams();
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const [error, setError] = useState();

  const history = useHistory();

  const [booking] = useRemoteSingleBooking();

  function cancelConfirm(e) {
    if (window.confirm("¿Seguro que deseas cancelar esta reserva?"))
      cancelHandler(e);
  }

  const cancelHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:3300/user/${decodedToken.id}/bookings/${infoParams.idBooking}/response/cancel`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setError("");
      let to = booking.booking.id_user_A;
      if (decodedToken.id === booking.booking.id_user_A) {
        to = booking.booking.id_user_B;
      }
      sendMessage({
        token,
        to,
        text: `El usuario ha cancelado tu reserva para el producto '${booking.moreInfo.title_product}'`,
      });
      history.goBack();
    } else {
      setError(data.error);
    }
  };

  const [product] = useRemoteSingleProduct(id);

  let display;
  product.data && product.data[0].status === "selled"
    ? (display = false)
    : (display = true);

  return (
    <>
      {display && (
        <button id="cancel-option" onClick={cancelConfirm}>
          CANCELAR
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
export default BookingOptionscancel;
